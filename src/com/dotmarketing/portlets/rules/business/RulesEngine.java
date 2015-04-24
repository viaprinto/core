package com.dotmarketing.portlets.rules.business;

import com.dotmarketing.beans.Host;
import com.dotmarketing.business.APILocator;
import com.dotmarketing.business.web.WebAPILocator;
import com.dotmarketing.exception.DotDataException;
import com.dotmarketing.exception.DotSecurityException;
import com.dotmarketing.portlets.rules.actionlet.RuleActionlet;
import com.dotmarketing.portlets.rules.model.Rule;
import com.dotmarketing.portlets.rules.model.RuleAction;
import com.dotmarketing.portlets.rules.model.RuleActionParameter;
import com.dotmarketing.util.Logger;
import com.liferay.portal.model.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class RulesEngine {

    private RulesAPI rulesAPI;

    private RulesEngine() {
        rulesAPI = APILocator.getRulesAPI();
    };

    private static class LazyHolder {
        private static final RulesEngine INSTANCE =  new RulesEngine();
    }

    public static RulesEngine getInstance() {
        return LazyHolder.INSTANCE;
    }

    public void fireRules(HttpServletRequest req, HttpServletResponse res, Rule.FireOn fireOn) {

        Host host;

        try {
            host =  WebAPILocator.getHostWebAPI().getCurrentHost(req);
        } catch (Exception e) {
            Logger.error(this, "Unable to retrieve current request host for URI ");
            return;
        }

        User systemUser;

        try {
            systemUser = WebAPILocator.getUserWebAPI().getSystemUser();
        } catch (DotDataException e) {
            Logger.error(this, "Unable to get systemUser", e);
            return;
        }

        try {

            Set<Rule> rules = rulesAPI.getRulesByHost(host.getIdentifier(), systemUser, false, fireOn);

            for (Rule rule : rules) {
                Boolean result = null;
                try {
                    result = rule.evaluate(req, res);
                } catch (DotDataException e) {
                    Logger.error(this, "Rule could not be evaluated. Rule Id: " + rule.getId());
                }

                // Let's execute the actions
                if(result) {
                    List<RuleAction> actions = rulesAPI.getRuleActionsByRule(rule.getId(), systemUser, false);

                    for (RuleAction action : actions) {
                        RuleActionlet actionlet = rulesAPI.findActionlet(action.getActionlet());
                        Map<String, RuleActionParameter> params = rulesAPI.getRuleActionParameters(action, systemUser, false);
                        actionlet.executeAction(params);
                    }
                }
            }

        } catch(DotDataException | DotSecurityException e) {
            Logger.error(this, "Unable process rules." + e.getMessage());
        }
    }
}