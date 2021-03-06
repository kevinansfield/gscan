const _ = require('lodash');
const spec = require('../specs');

let checkGhostHeadFoot;

checkGhostHeadFoot = function checkGhostHeadFoot(theme, options) {
    const checkVersion = _.get(options, 'checkVersion', 'latest');
    let ruleSet = spec.get([checkVersion]);

    // CASE: 040-ghost-head-foot checks only needs `rules` that start with `GS040-` 
    const ruleRegex = /GS040-.*/g;

    ruleSet = _.pickBy(ruleSet.rules, function (rule, ruleCode) {
        if (ruleCode.match(ruleRegex)) {
            return rule;
        }
    });

    _.each(ruleSet, function (check, ruleCode) {
        if (!theme.helpers || !theme.helpers.hasOwnProperty(check.helper)) {
            theme.results.fail[ruleCode] = {
                failures: [{
                    ref: 'default.hbs'
                }]
            };
        } else {
            theme.results.pass.push(ruleCode);
        }
    });

    return theme;
};

module.exports = checkGhostHeadFoot;
