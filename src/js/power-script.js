function MyClass() {

  this.parameter='value';

}

MyClass.prototype.getParameter = function () {
  return this.parameter;
};

MyClass.prototype.myMethod = function() {
  console.log("stica");
};
