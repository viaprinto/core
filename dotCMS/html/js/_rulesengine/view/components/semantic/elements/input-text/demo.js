System.register(['@angular/core', '@angular/common', "./input-text"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, input_text_1;
    var Hero, HeroFormComponent, App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (input_text_1_1) {
                input_text_1 = input_text_1_1;
            }],
        execute: function() {
            Hero = (function () {
                function Hero(id, name, inputname, power, alterEgo) {
                    this.id = id;
                    this.name = name;
                    this.inputname = inputname;
                    this.power = power;
                    this.alterEgo = alterEgo;
                    console.log("New Hero", this.inputname, ' ==> ', inputname);
                }
                return Hero;
            }());
            exports_1("Hero", Hero);
            HeroFormComponent = (function () {
                function HeroFormComponent(fb) {
                    this.powers = ['Really Smart', 'Super Flexible',
                        'Super Hot', 'Weather Changer'];
                    this.hero = new Hero(18, 'Dr IQ', "def", this.powers[0], 'Chuck Overstreet');
                    this.submitted = false;
                    this.model = fb.group({
                        name: new common_1.Control(this.hero.name, common_1.Validators.minLength(5)),
                        alterEgo: new common_1.Control(this.hero.alterEgo, common_1.Validators.required),
                        power: new common_1.Control(this.hero.power)
                    });
                }
                HeroFormComponent.prototype.onSubmit = function () {
                    this.submitted = true;
                };
                Object.defineProperty(HeroFormComponent.prototype, "diagnostic", {
                    // TODO: Remove this when we're done
                    get: function () {
                        return JSON.stringify(this.hero);
                    },
                    enumerable: true,
                    configurable: true
                });
                HeroFormComponent = __decorate([
                    core_1.Component({
                        selector: 'hero-form',
                        directives: [input_text_1.InputText, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, common_1.NgFormModel],
                        template: "<div flex layout=\"row\" layout-align=\"center center\">\n  <div flex=\"40\" layout=\"row\" layout-wrap layout-align=\"center center\">\n    <form (ngSubmit)=\"onSubmit()\" [ngFormModel]=\"model\" #hf=\"ngForm\">\n      <div flex=\"100\" layout=\"row\">{{diagnostic}}</div>\n      <div flex=\"100\" layout-wrap layout=\"row\" class=\"ui attached segment\">\n        <label flex=\"100\" for=\"name\">Name</label>\n        <cw-input-text flex=\"100\" required  ngControl=\"name\" #fName=\"ngForm\"> </cw-input-text>\n        <div flex=\"50\" [hidden]=\"fName.valid\" class=\"name red basic label\">Name is required</div>\n      </div>\n      <div flex=\"100\" layout-wrap layout=\"row\" class=\"ui attached segment\">\n        <label flex=\"100\" for=\"alterEgo\">Alter Ego</label>\n        <cw-input-text flex=\"100\" class=\"ui  icon input\" ngControl=\"alterEgo\"> </cw-input-text>\n      </div>\n      <div flex=\"100\" layout=\"row\" layout-wrap class=\"ui attached segment\">\n        <label flex=\"100\" for=\"power\">Hero Power</label>\n        <select flex=\"100\" class=\"ui icon input\" required ngControl=\"power\" #fPower=\"ngForm\">\n          <option *ngFor=\"#p of powers\" [value]=\"p\">{{p}}</option>\n        </select>\n        <div flex=\"100\" [hidden]=\"fPower.valid\" [class.ui]=\"!fPower.valid\" class=\"red basic label\"> Power is required</div>\n      </div>\n      <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!hf.form.valid\">Submit</button>\n    </form>\n  </div>\n</div>\n  "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], HeroFormComponent);
                return HeroFormComponent;
            }());
            exports_1("HeroFormComponent", HeroFormComponent);
            App = (function () {
                function App(fb) {
                    this.model = fb.group({
                        demoOneCtrl: new common_1.Control('test', common_1.Validators.minLength(5)),
                        someDate: new common_1.Control(new Date().toISOString().split('T')[0], function (c) {
                            var v;
                            try {
                                var d = new Date(c.value);
                                console.log('The date is ', d);
                                if (d < new Date()) {
                                    v = { hateful: true };
                                }
                            }
                            catch (e) {
                                v = { broken: true };
                            }
                            return v;
                        })
                    });
                }
                App = __decorate([
                    core_1.Component({
                        selector: 'demo',
                        directives: [input_text_1.InputText, common_1.FORM_DIRECTIVES, common_1.NgFormModel, HeroFormComponent],
                        template: "<div [ngFormModel]=\"model\">\n  <div style=\"margin-top:5em;margin-bottom:5em\">\n    <hero-form></hero-form>\n  </div>\n  <div flex layout=\"row\" layout-wrap>\n    <div flex=\"33\">\n      <h4 class=\"ui top attached inverted header\">Value</h4>\n      <div class=\"ui attached segment\">\n        <cw-input-text ngControl=\"demoOneCtrl\"></cw-input-text>\n      </div>\n    </div>\n  </div>\n</div>\n\n  "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=demo.js.map