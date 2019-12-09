import { DomUtil } from "leaflet";

let LDomUtilApplyClassesMethod = function(method, element, classNames) {
  classNames = classNames.split(" ");
  classNames.forEach(function(className) {
    DomUtil[method].call(this, element, className);
  });
};

export function addClasses(el, names) {
  LDomUtilApplyClassesMethod("addClass", el, names);
}
export function removeClasses(el, names) {
  LDomUtilApplyClassesMethod("removeClass", el, names);
}
