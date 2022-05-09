import type { ColorScheme } from "@mantine/core";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "remix-nested-routed-with-mantine",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withNormalizeCSS
            withGlobalStyles
            theme={{ colorScheme }}
          >
            <GlobalStyles />
            <NotificationsProvider>
              <Outlet />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const GlobalStyles = () => (
  <Global
    styles={{
      "html, body": { height: "100%", margin: 0 },
    }}
  />
);
