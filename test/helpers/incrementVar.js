var Code = require('code'),
    Lab = require('lab'),
    Paper = require('../../index'),
    lab = exports.lab = Lab.script(),
    describe = lab.experiment,
    expect = Code.expect,
    it = lab.it;

function c(template, context) {
    const themeSettings = {};
    return new Paper({}, themeSettings).loadTemplatesSync({template: template}).render('template', context);
}

describe('incrementVar helper', function() {
    const context = {
        value1: 12
    };

    it('should correctly increment', function(done) {
        expect(c("{{incrementVar 'data1'}}{{getVar 'data1'}} {{incrementVar 'data1'}}{{getVar 'data1'}} {{incrementVar 'data1'}}{{getVar 'data1'}}", context))
            .to.be.equal('00 11 22');
        done();
    });

    it('should correctly increment an existing variable', function(done) {
        expect(c("{{assignVar 'data1' value1}}{{getVar 'data1'}} {{incrementVar 'data1'}}", context))
            .to.be.equal('12 13');
        expect(c("{{assignVar 'data1' 12}}{{getVar 'data1'}} {{incrementVar 'data1'}}", context))
            .to.be.equal('12 13');
        expect(c("{{assignVar 'data1' -12}}{{getVar 'data1'}} {{incrementVar 'data1'}}", context))
            .to.be.equal('-12 -11');
        done();
    });

    it('should correctly overwrite an existing non-integer variable', function(done) {
        expect(c("{{assignVar 'data1' 'a'}}{{getVar 'data1'}} {{incrementVar 'data1'}}", context))
            .to.be.equal('a 0');
        done();
    });

    it('should correctly increment', function(done) {
        expect(c("{{incrementVar 'data1'}}{{getVar 'data1'}} {{incrementVar 'data1'}}{{getVar 'data1'}} {{incrementVar 'data1'}}{{getVar 'data1'}}", context))
            .to.be.equal('00 11 22');
        done();
    });

    it('should throw an exception if the incrementVar key is not a string', function (done) {
        try {
            c('{{incrementVar 1}}');
        } catch(e) {
            done();
        }
    });
});