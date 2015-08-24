package com.dotmarketing.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.dotmarketing.beans.Host;
import com.dotmarketing.business.APILocator;
import com.dotmarketing.business.web.WebAPILocator;
import com.dotmarketing.exception.DotDataException;
import com.dotmarketing.exception.DotSecurityException;
import com.dotmarketing.util.Logger;
import com.liferay.portal.PortalException;
import com.liferay.portal.SystemException;

/**
 * Sets the default language for the current host
 * 
 * @author Sebastian Plotzky
 */

public class DefaultLanguageFilter implements Filter {

	private FilterConfig filterConfig;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException,
			ServletException {

		if (request instanceof HttpServletRequest) {

			HttpServletRequest httpRequest = (HttpServletRequest) request;

			HttpSession httpSession = httpRequest.getSession(false);

			Host host;

			try {
				host = WebAPILocator.getHostWebAPI().getCurrentHost(httpRequest);
			} catch (PortalException e) {
				Logger.error(this, "Unable to retrieve current request host for URI " + httpRequest.getRequestURI());
				throw new ServletException(e.getMessage(), e);
			} catch (SystemException e) {
				Logger.error(this, "Unable to retrieve current request host for URI " + httpRequest.getRequestURI());
				throw new ServletException(e.getMessage(), e);
			} catch (DotDataException e) {
				Logger.error(this, "Unable to retrieve current request host for URI " + httpRequest.getRequestURI());
				throw new ServletException(e.getMessage(), e);
			} catch (DotSecurityException e) {
				Logger.error(this, "Unable to retrieve current request host for URI " + httpRequest.getRequestURI());
				throw new ServletException(e.getMessage(), e);
			}

			Logger.debug(this, "Current host is: " + host.getHostname());

			String languageId = filterConfig.getInitParameter(host.getHostname());

			if (languageId == null) {
				languageId = String.valueOf(APILocator.getLanguageAPI().getDefaultLanguage().getId());
			}

			Logger.debug(this, "Setting language ID to: " + languageId);

			httpRequest.setAttribute(com.dotmarketing.util.WebKeys.HTMLPAGE_LANGUAGE, languageId);
			httpRequest.setAttribute("language_id", languageId);

			if (httpSession != null) {
				httpSession.setAttribute(com.dotmarketing.util.WebKeys.HTMLPAGE_LANGUAGE, languageId);
			}
		}

		filterChain.doFilter(request, response);
	}

	public void destroy() {

	}
}
