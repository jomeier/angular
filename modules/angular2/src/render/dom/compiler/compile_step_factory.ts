import {List} from 'angular2/src/facade/collection';
import {Parser} from 'angular2/src/change_detection/change_detection';
import {ViewDefinition} from '../../api';
import {CompileStep} from './compile_step';
import {PropertyBindingParser} from './property_binding_parser';
import {TextInterpolationParser} from './text_interpolation_parser';
import {DirectiveParser} from './directive_parser';
import {ViewSplitter} from './view_splitter';
import {ShadowDomCompileStep} from '../shadow_dom/shadow_dom_compile_step';
import {ShadowDomStrategy} from '../shadow_dom/shadow_dom_strategy';

export class CompileStepFactory {
  createSteps(view: ViewDefinition): List<CompileStep> { return null; }
}

export class DefaultStepFactory extends CompileStepFactory {
  constructor(public _parser: Parser, public _shadowDomStrategy: ShadowDomStrategy) { super(); }

  createSteps(view: ViewDefinition): List<CompileStep> {
    return [
      new ViewSplitter(this._parser),
      new PropertyBindingParser(this._parser),
      new DirectiveParser(this._parser, view.directives),
      new TextInterpolationParser(this._parser),
      new ShadowDomCompileStep(this._shadowDomStrategy, view)
    ];
  }
}
