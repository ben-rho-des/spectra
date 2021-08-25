const fs = require('fs');
const { Spectral } = require("@stoplight/spectral-core");
const yaml = require('js-yaml');

const { truthy, falsy } = require("@stoplight/spectral-functions");

const spectral = new Spectral();

const { oas: oas } = require("@stoplight/spectral-rulesets");

spectral.setRuleset({
    extends: oas,
    rules: {
        "no-empty-description": {
            given: "$.x-swagstar",
            message: "Bro fix your swagstar",
            then: {
                function: truthy,
            },
        },
    },
});

const lint = async () => {
    try {
        const fileContents = fs.readFileSync('./api.yml', 'utf8');
        let oadoc = yaml.load(fileContents);
        const results = await spectral.run(oadoc);
        console.log("results are: ", results);
    } catch (error) {
        console.log("error is:", error)
    }
}
lint();
