define(function () {
  return function (ParsleyField, Parsley) {
    describe('ParsleyField', function () {
      it('should be an function', function () {
        expect(ParsleyField).to.be.a('function');
      });
      it('should throw an error if no element given', function () {
        expect(ParsleyField).to.throwException();
      });
      it('should generate proper hash', function () {
        $('body').append('<input type="text" id="element" data-parsley-notnull />')
        expect(new ParsleyField($('#element')).hash.length).to.be(new String('parsley-').length + 7);
      });
      it('should properly bind DOM constraints', function () {
        $('body').append('<input type="text" id="element" data-parsley-required />');
        var parsleyField = new ParsleyField($('#element'), new Parsley($('#element')).options);
        expect(parsleyField.constraints.length).to.be(1);
        expect(parsleyField.constraints[0].__class__).to.be('Constraint');
        expect(parsleyField.constraints[0].name).to.be('required');
        expect(parsleyField.constraints[0].isDomConstraint).to.be(true);
      });
      it('should use addConstraint() javascript method', function () {
        $('body').append('<input type="text" id="element" />');
        var parsleyField = new ParsleyField($('#element'))
          .addConstraint({ required: true });
        expect(parsleyField.constraints.length).to.be(1);
        expect(parsleyField.constraints[0].__class__).to.be('Constraint');
        expect(parsleyField.constraints[0].name).to.be('required');
        expect(parsleyField.constraints[0].requirements).to.be(true);
        expect(parsleyField.constraints[0].isDomConstraint).to.be(false);

        // trying to add an existing constraint result in an update
        parsleyField.addConstraint({ required: false });
        console.log(parsleyField)
        expect(parsleyField.constraints.length).to.be(1);
        expect(parsleyField.constraints[0].name).to.be('required');
        expect(parsleyField.constraints[0].requirements).to.be(false);
      });
      afterEach(function () {
        window.ParsleyConfig = {};
        if ($('#element').length)
            $('#element').remove();
      });
    });
  }
});
