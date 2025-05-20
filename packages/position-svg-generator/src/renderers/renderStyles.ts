import { suisseIntlMediumBase64 } from "../constants/fonts";

export function renderStyles() {
  return `
  <style type="text/css">
    @font-face {
      font-family: 'SuisseIntl';
      src: url('${suisseIntlMediumBase64}') format('woff2');
      font-weight: 500
    }

    text {
      font-family: 'SuisseIntl';
      font-weight: 500
    }

  </style>
  `;
}
