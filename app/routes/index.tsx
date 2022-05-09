import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { Sun, MoonStars, Logout, Plus, Note } from "tabler-icons-react";

import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Navbar,
  Title,
  useMantineColorScheme,
  Anchor,
  Text,
  ThemeIcon,
  Stack,
  UnstyledButton,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  Aside,
} from "@mantine/core";
import type { To } from "history";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import AppLayout from "~/layout";

export default function homePage() {
  const [opened, setOpened] = useState(false);

  return (
    <AppLayout>
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!opened}
        onClick={() => setOpened(false)}
        width={{ sm: 300, lg: 300 }}
      >
        <Navbar.Section grow mt="xs">
          <Stack>
            <MenuEntry
              to="screens/cliente"
              icon={
                <ThemeIcon variant="light">
                  <Plus size={16} />
                </ThemeIcon>
              }
              label="Cliente"
            />
            <MenuEntry
              to="screens/venda"
              icon={
                <ThemeIcon variant="light">
                  <Plus size={16} />
                </ThemeIcon>
              }
              label="Venda"
            />
            <MenuEntry
              to="screens/produto"
              icon={
                <ThemeIcon variant="light">
                  <Plus size={16} />
                </ThemeIcon>
              }
              label="Produto"
            />
          </Stack>
        </Navbar.Section>
      </Navbar>
      <Outlet />
    </AppLayout>
  );
}

interface MenuEntryProps {
  icon: JSX.Element;
  label: string;
  to: To;
}
const MenuEntry = ({ icon, label, to }: MenuEntryProps) => (
  <UnstyledButton
    aria-label={label}
    component={Link}
    to={to}
    sx={(theme) => ({
      display: "block",
      width: "100%",
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[1],
      },
    })}
  >
    <Group>
      {icon}
      <Text>{label}</Text>
    </Group>
  </UnstyledButton>
);
