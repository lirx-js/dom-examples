import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** TYPES **/

interface ITemplateData {
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <!--FROM http://eyeasme.com/Joe/MathML/MathML_browser_test.html-->
    <math style="font-size: 24pt" display="block">
      <mrow>
        <munderover>
          <mmultiscripts>
            <mo>&Product;</mo>
            <mmultiscripts>
              <mi>&Efr;</mi>
              <mi>&upsilon;</mi>
              <mi>&tau;</mi>
              <mprescripts />
              <mi>&rho;</mi>
              <mi>&sigma;</mi>
            </mmultiscripts>
            <mmultiscripts>
              <mi>&Dfr;</mi>
              <mi>&pi;</mi>
              <mi>&omicron;</mi>
              <mprescripts />
              <mi>&nu;</mi>
              <mi>&xi;</mi>
            </mmultiscripts>
            <mprescripts />
            <mmultiscripts>
              <mi>&Afr;</mi>
              <mi>&delta;</mi>
              <mi>&gamma;</mi>
              <mprescripts />
              <mi>&alpha;</mi>
              <mi>&beta;</mi>
            </mmultiscripts>
            <mmultiscripts>
              <mi>&Bfr;</mi>
              <mi>&theta;</mi>
              <mi>&eta;</mi>
              <mprescripts />
              <mi>&epsilon;</mi>
              <mi>&zeta;</mi>
            </mmultiscripts>
          </mmultiscripts>
          <mmultiscripts>
            <mi>&Ffr;</mi>
            <mi>&omega;</mi>
            <mi>&psi;</mi>
            <mprescripts />
            <mi>&straightphi;</mi>
            <mi>&chi;</mi>
          </mmultiscripts>
          <mmultiscripts>
            <mi>&Cfr;</mi>
            <mi>&mu;</mi>
            <mi>&lambda;</mi>
            <mprescripts />
            <mi>&iota;</mi>
            <mi>&kappa;</mi>
          </mmultiscripts>
        </munderover>
      </mrow>
    </math>
  `,
});

/** COMPONENT **/

export const AppMathMLExampleComponent = new Component({
  name: 'app-math-ml-example',
  template,
});

