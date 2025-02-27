import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useRBAC, TrackingProvider } from '@strapi/helper-plugin';
import { QueryClient, QueryClientProvider } from 'react-query';
import { lightTheme, darkTheme } from '@strapi/design-system';
import { axiosInstance } from '../../../../../../core/utils';
import Theme from '../../../../../../components/Theme';
import ThemeToggleProvider from '../../../../../../components/ThemeToggleProvider';
import ListView from '../index';

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  useNotification: jest.fn(),
  useFocusWhenNavigate: jest.fn(),
  useRBAC: jest.fn(),
  useGuidedTour: jest.fn(() => ({
    startSection: jest.fn(),
  })),
}));

jest.spyOn(axiosInstance, 'get').mockResolvedValue({
  data: {
    data: [
      {
        id: 1,
        name: 'My super token',
        description: 'This describe my super token',
        type: 'read-only',
        createdAt: '2021-11-15T00:00:00.000Z',
      },
    ],
  },
});

jest.spyOn(Date, 'now').mockImplementation(() => new Date('2015-10-01T08:00:00.000Z'));

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const makeApp = (history) => {
  return (
    <QueryClientProvider client={client}>
      <TrackingProvider>
        <IntlProvider messages={{}} defaultLocale="en" textComponent="span" locale="en">
          <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
            <Theme>
              <Router history={history}>
                <Route path="/settings/api-tokens">
                  <ListView />
                </Route>
              </Router>
            </Theme>
          </ThemeToggleProvider>
        </IntlProvider>
      </TrackingProvider>
    </QueryClientProvider>
  );
};

describe('ADMIN | Pages | API TOKENS | ListPage', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should show a list of api tokens', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: true,
        canDelete: true,
        canRead: true,
        canUpdate: true,
        canRegenerate: true,
      },
    }));
    const history = createMemoryHistory();
    history.push('/settings/api-tokens');
    const app = makeApp(history);

    const { container, getByText } = render(app);

    await waitFor(() => {
      expect(getByText('My super token')).toBeInTheDocument();
      expect(getByText('This describe my super token')).toBeInTheDocument();
    });

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c25 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c2 {
        background: #f6f6f9;
        padding-top: 40px;
        padding-right: 56px;
        padding-bottom: 40px;
        padding-left: 56px;
      }

      .c9 {
        padding-right: 8px;
      }

      .c12 {
        padding-right: 56px;
        padding-left: 56px;
      }

      .c13 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c16 {
        padding-right: 24px;
        padding-left: 24px;
      }

      .c29 {
        max-width: 15.625rem;
      }

      .c36 {
        padding-left: 4px;
      }

      .c3 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c4 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c32 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: end;
        -webkit-justify-content: end;
        -ms-flex-pack: end;
        justify-content: end;
      }

      .c6 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.25;
        color: #32324d;
      }

      .c10 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #32324d;
      }

      .c11 {
        font-size: 1rem;
        line-height: 1.5;
        color: #666687;
      }

      .c22 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
        color: #666687;
      }

      .c28 {
        font-size: 0.875rem;
        line-height: 1.43;
        font-weight: 600;
        color: #32324d;
      }

      .c30 {
        font-size: 0.875rem;
        line-height: 1.43;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #32324d;
      }

      .c31 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c35 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c7 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdce4;
        position: relative;
        outline: none;
      }

      .c7 svg {
        height: 12px;
        width: 12px;
      }

      .c7 svg > g,
      .c7 svg path {
        fill: #ffffff;
      }

      .c7[aria-disabled='true'] {
        pointer-events: none;
      }

      .c7:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c7:focus-visible {
        outline: none;
      }

      .c7:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c37 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c37 .c5 {
        color: #ffffff;
      }

      .c37[aria-disabled='true'] .c5 {
        color: #666687;
      }

      .c37[aria-disabled='true']:active .c5 {
        color: #666687;
      }

      .c37:active .c5 {
        color: #4945ff;
      }

      .c37 .c5 {
        color: #271fe0;
      }

      .c14 {
        overflow: hidden;
        border: 1px solid #eaeaef;
      }

      .c18 {
        width: 100%;
        white-space: nowrap;
      }

      .c15 {
        position: relative;
      }

      .c15:before {
        background: linear-gradient(90deg,#c0c0cf 0%,rgba(0,0,0,0) 100%);
        opacity: 0.2;
        position: absolute;
        height: 100%;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        width: 8px;
        left: 0;
      }

      .c15:after {
        background: linear-gradient(270deg,#c0c0cf 0%,rgba(0,0,0,0) 100%);
        opacity: 0.2;
        position: absolute;
        height: 100%;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        width: 8px;
        right: 0;
        top: 0;
      }

      .c17 {
        overflow-x: auto;
      }

      .c27 tr:last-of-type {
        border-bottom: none;
      }

      .c19 {
        border-bottom: 1px solid #eaeaef;
      }

      .c20 {
        border-bottom: 1px solid #eaeaef;
      }

      .c20 td,
      .c20 th {
        padding: 16px;
      }

      .c20 td:first-of-type,
      .c20 th:first-of-type {
        padding: 0 4px;
      }

      .c20 th {
        padding-top: 0;
        padding-bottom: 0;
        height: 3.5rem;
      }

      .c21 {
        vertical-align: middle;
        text-align: left;
        color: #666687;
        outline-offset: -4px;
      }

      .c21 input {
        vertical-align: sub;
      }

      .c23 svg {
        height: 0.25rem;
      }

      .c24 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 2rem;
        width: 2rem;
        border: none;
      }

      .c24 svg > g,
      .c24 svg path {
        fill: #8e8ea9;
      }

      .c24:hover svg > g,
      .c24:hover svg path {
        fill: #666687;
      }

      .c24:active svg > g,
      .c24:active svg path {
        fill: #a5a5ba;
      }

      .c24[aria-disabled='true'] {
        background-color: #eaeaef;
      }

      .c24[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c33 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        position: relative;
        outline: none;
      }

      .c33 svg path {
        fill: #4945ff;
      }

      .c33 svg {
        font-size: 0.625rem;
      }

      .c33:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c33:focus-visible {
        outline: none;
      }

      .c33:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c8 {
        padding: 8px 16px;
        background: #4945ff;
        border: 1px solid #4945ff;
        border-radius: 4px;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .c8 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c8 .c5 {
        color: #ffffff;
      }

      .c8[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c8[aria-disabled='true'] .c5 {
        color: #666687;
      }

      .c8[aria-disabled='true'] svg > g,
      .c8[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c8[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c8[aria-disabled='true']:active .c5 {
        color: #666687;
      }

      .c8[aria-disabled='true']:active svg > g,
      .c8[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c8:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c8:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c8 svg > g,
      .c8 svg path {
        fill: #ffffff;
      }

      .c26 {
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      .c0:focus-visible {
        outline: none;
      }

      .c34 svg path {
        fill: #8e8ea9;
      }

      .c34:hover svg path,
      .c34:focus svg path {
        fill: #32324d;
      }

      <main
        aria-busy="false"
        aria-labelledby="main-content-title"
        class="c0"
        id="main-content"
        tabindex="-1"
      >
        <div
          style="height: 0px;"
        >
          <div
            class="c1 c2"
            data-strapi-header="true"
          >
            <div
              class="c1 c3"
            >
              <div
                class="c1 c4"
              >
                <h1
                  class="c5 c6"
                >
                  API Tokens
                </h1>
              </div>
              <a
                aria-disabled="false"
                class="c7 c8"
                data-testid="create-api-token-button"
                href="/settings/api-tokens/create"
                variant="default"
              >
                <div
                  aria-hidden="true"
                  class="c1 c9"
                >
                  <svg
                    fill="none"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 13.604a.3.3 0 01-.3.3h-9.795V23.7a.3.3 0 01-.3.3h-3.21a.3.3 0 01-.3-.3v-9.795H.3a.3.3 0 01-.3-.3v-3.21a.3.3 0 01.3-.3h9.795V.3a.3.3 0 01.3-.3h3.21a.3.3 0 01.3.3v9.795H23.7a.3.3 0 01.3.3v3.21z"
                      fill="#212134"
                    />
                  </svg>
                </div>
                <span
                  class="c5 c10"
                >
                  Create new API Token
                </span>
              </a>
            </div>
            <p
              class="c5 c11"
            >
              List of generated tokens to consume the API
            </p>
          </div>
        </div>
        <div
          class="c1 c12"
        >
          <div
            class="c1 c13 c14"
          >
            <div
              class="c1 c15"
            >
              <div
                class="c1 c16 c17"
              >
                <table
                  aria-colcount="5"
                  aria-rowcount="2"
                  class="c18"
                >
                  <thead
                    class="c19"
                  >
                    <tr
                      aria-rowindex="1"
                      class="c1 c20"
                    >
                      <th
                        aria-colindex="1"
                        class="c1 c21"
                        tabindex="0"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="tooltip-1"
                              class="c5 c22"
                              label="Name"
                              tabindex="-1"
                            >
                              Name
                            </span>
                          </span>
                          <span
                            class="c23"
                          >
                            <span>
                              <button
                                aria-disabled="false"
                                aria-labelledby="tooltip-3"
                                class="c7 c24"
                                tabindex="-1"
                                type="button"
                              >
                                <span
                                  class="c25"
                                >
                                  Sort on Name
                                </span>
                                <svg
                                  aria-hidden="true"
                                  class="c26"
                                  fill="none"
                                  focusable="false"
                                  height="1em"
                                  viewBox="0 0 14 8"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    clip-rule="evenodd"
                                    d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                                    fill="#32324D"
                                    fill-rule="evenodd"
                                  />
                                </svg>
                              </button>
                            </span>
                          </span>
                        </div>
                      </th>
                      <th
                        aria-colindex="2"
                        class="c1 c21"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="tooltip-5"
                              class="c5 c22"
                              label="Description"
                              tabindex="-1"
                            >
                              Description
                            </span>
                          </span>
                          <span
                            class="c23"
                          />
                        </div>
                      </th>
                      <th
                        aria-colindex="3"
                        class="c1 c21"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="tooltip-7"
                              class="c5 c22"
                              label="Created at"
                              tabindex="-1"
                            >
                              Created at
                            </span>
                          </span>
                          <span
                            class="c23"
                          />
                        </div>
                      </th>
                      <th
                        aria-colindex="4"
                        class="c1 c21"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="tooltip-9"
                              class="c5 c22"
                              label="Last used"
                              tabindex="-1"
                            >
                              Last used
                            </span>
                          </span>
                          <span
                            class="c23"
                          />
                        </div>
                      </th>
                      <th
                        aria-colindex="5"
                        class="c1 c21"
                        tabindex="-1"
                      >
                        <div
                          class="c1 c4"
                        >
                          <div
                            class="c25"
                          >
                            Actions
                          </div>
                          <span
                            class="c23"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="c27"
                  >
                    <tr
                      aria-rowindex="2"
                      class="c1 c20"
                      style="cursor: pointer;"
                    >
                      <td
                        aria-colindex="1"
                        class="c1 c21"
                        tabindex="-1"
                      >
                        <span
                          class="c5 c28"
                        >
                          My super token
                        </span>
                      </td>
                      <td
                        aria-colindex="2"
                        class="c1 c29 c21"
                        tabindex="-1"
                      >
                        <span
                          class="c5 c30"
                        >
                          This describe my super token
                        </span>
                      </td>
                      <td
                        aria-colindex="3"
                        class="c1 c21"
                        tabindex="-1"
                      >
                        <span
                          class="c5 c31"
                        >
                          <time
                            datetime="2021-11-15T00:00:00.000Z"
                            title="11/15/2021 12:00 AM"
                          >
                            in 6 years
                          </time>
                        </span>
                      </td>
                      <td
                        aria-colindex="4"
                        class="c1 c21"
                        tabindex="-1"
                      />
                      <td
                        aria-colindex="5"
                        class="c1 c21"
                        tabindex="-1"
                      >
                        <div
                          class="c1 c32"
                        >
                          <a
                            class="c33 c34"
                            href="/settings/api-tokens/1"
                            tabindex="-1"
                            title="Edit My super token"
                          >
                            <span
                              class="c5 c35"
                            >
                              <svg
                                fill="none"
                                height="1em"
                                viewBox="0 0 24 24"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  clip-rule="evenodd"
                                  d="M23.604 3.514c.528.528.528 1.36 0 1.887l-2.622 2.607-4.99-4.99L18.6.396a1.322 1.322 0 011.887 0l3.118 3.118zM0 24v-4.99l14.2-14.2 4.99 4.99L4.99 24H0z"
                                  fill="#212134"
                                  fill-rule="evenodd"
                                />
                              </svg>
                            </span>
                          </a>
                          <div
                            aria-hidden="true"
                            class="c1 c36"
                            role="button"
                          >
                            <span>
                              <button
                                aria-disabled="false"
                                aria-labelledby="tooltip-11"
                                class="c7 c24"
                                name="delete"
                                tabindex="-1"
                                type="button"
                              >
                                <span
                                  class="c25"
                                >
                                  Delete My super token
                                </span>
                                <svg
                                  aria-hidden="true"
                                  fill="none"
                                  focusable="false"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.236 6.149a.2.2 0 00-.197.233L6 24h12l2.96-17.618a.2.2 0 00-.196-.233H3.236zM21.8 1.983c.11 0 .2.09.2.2v1.584a.2.2 0 01-.2.2H2.2a.2.2 0 01-.2-.2V2.183c0-.11.09-.2.2-.2h5.511c.9 0 1.631-1.09 1.631-1.983h5.316c0 .894.73 1.983 1.631 1.983H21.8z"
                                    fill="#32324D"
                                  />
                                </svg>
                              </button>
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    `);
  });

  it('should not show the create button when the user does not have the rights to create', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: false,
        canDelete: true,
        canRead: true,
        canUpdate: true,
        canRegenerate: true,
      },
    }));

    const history = createMemoryHistory();
    const app = makeApp(history);

    const { queryByTestId } = render(app);

    await waitFor(() => expect(queryByTestId('create-api-token-button')).not.toBeInTheDocument());
  });

  it('should show the delete button when the user have the rights to delete', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: false,
        canDelete: true,
        canRead: true,
        canUpdate: false,
        canRegenerate: false,
      },
    }));
    const history = createMemoryHistory();
    history.push('/settings/api-tokens');
    const app = makeApp(history);

    const { container } = render(app);

    await waitFor(() => {
      expect(container.querySelector('button[name="delete"]')).toBeInTheDocument();
    });
  });

  it('should show the read button when the user have the rights to read and not to update', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: false,
        canDelete: true,
        canRead: true,
        canUpdate: false,
        canRegenerate: false,
      },
    }));
    const history = createMemoryHistory();
    history.push('/settings/api-tokens');
    const app = makeApp(history);

    const { container } = render(app);

    await waitFor(() => {
      expect(container.querySelector('a[title*="Read"]')).toBeInTheDocument();
    });
  });
});
