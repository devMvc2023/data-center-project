import { css } from "@emotion/react";

const bodyheight = window.innerHeight;
const bodywidth = window.innerWidth;

export const root = css`
  :root {
    --navbar-height: 60px;
    --body-height: ${bodyheight}px;
    --body-width: ${bodywidth}px;
    --form-footer-height: 34px;
    --form-input-height: 30px;
    --breadcrumbs-height: 60px;

    // color
    --gray-1: #707070;
    --gray-2: #a0a0a0;
    --gray-3: #c1c1c1;
    --gray-4: #ebebeb;
    --gray-5: #e5eded;

    --blue-1: #172954;
    --blue-2: #2155cd;
    --blue-3: #0aa1dd;
    --blue-4: #79dae8;
    --blue-5: #e8f9fd;

    --green-1: #27903a;
    --green-2: #00ffab;
    --green-3: #14c38e;
    --green-4: #b8f1b0;
    --green-5: #e3fcbf;
    --green-6: #28a745;

    --red-1: #9c0909;
    --red-2: #aa0e0e;
    --red-3: #c30000;
    --red-4: #fe5f55;
    --red-5: #ff715c;
    --red-6: #fbdad9;
    --red-7: #dc3545;
    //
    --navbar-bgc: var(--bgc);
    --bgc: var(--red-1);

    //font
    --default-font-th: "Prompt", sans-serif;

    --primary-color: #4f8a90;
    --second-color: #e2a391;
    --third-color: var(--gray-2);
    --info-color: #2b2c27;
    --success-color: #e2a391;
  }
`;
