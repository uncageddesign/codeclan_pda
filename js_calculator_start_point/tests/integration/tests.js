const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('calculator functionality', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:3000');
  });

  // write integration tests here in the form of "it should do something..."
  it('should have working number buttons', function(){
    running_total = element(by.css('#running_total'))
    element(by.css('#number2')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('2')
  })

// Do the number buttons update the display of the running total?
  it('should update the display of the running total', function() {
    running_total = element(by.css('#running_total'))
    element(by.css('#number1')).click();
    element(by.css('#number1')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('11');
  })

// Do the arithmetical operations update the display with the result of the operation?
  it('should update the display with results of the arithmetical operations', function() {
    running_total = element(by.css('#running_total'))
    element(by.css('#number1')).click();
    element(by.css('#operator_add')).click();
    element(by.css('#number1')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('2');
  })

// Can multiple operations be chained together?
 it('should be able to chain multiple operations together', function() {
   running_total = element(by.css('#running_total'))
   element(by.css('#number1')).click();
   element(by.css('#operator_add')).click();
   element(by.css('#number1')).click();
   element(by.css('#operator_add')).click();
   element(by.css('#number2')).click();
   element(by.css('#operator_equals')).click();
   expect(running_total.getAttribute('value')).to.eventually.equal('4');
 })


// Is the output as expected for a range of numbers (for example, positive, negative, decimals and very large numbers)?
  it('should output the expected number for a positive number', function() {
    running_total = element(by.css('#running_total'))
    element(by.css('#number1')).click();
    element(by.css('#operator_add')).click();
    element(by.css('#number1')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('2');
  })

  it('should output the expected value for a negative number', function() {
    element(by.css('#number1')).click();
    element(by.css('#operator_subtract')).click();
    element(by.css('#number2')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('-1');
  })

  it('should output the expected value for a decimal number', function() {
    element(by.css('#number1')).click();
    element(by.css('#operator_divide')).click();
    element(by.css('#number2')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('0.5');
  })

  it('should output the expected value for a large number', function() {
    element(by.css('#number2')).click();
    element(by.css('#number7')).click();
    element(by.css('#number4')).click();
    element(by.css('#number2')).click();
    //earth diameter
    element(by.css('#operator_multiply')).click();
    element(by.css('#number6')).click();
    element(by.css('#number7')).click();
    element(by.css('#number7')).click();
    element(by.css('#number9')).click();
    //mars diameter
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('18588018');
  })

// What does the code do in exceptional circumstances? Specifically, if you divide by zero, what is the effect? Write a test to describe what you'd prefer to happen, and then correct the code to make that test pass (you will need to modify the Calculator model to meet this requirement).
  it('should not break when zero is used', function() {
    element(by.css('#number1')).click();
    element(by.css('#operator_divide')).click();
    element(by.css('#number0')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('Cannot divide by Zero');
  })

});
