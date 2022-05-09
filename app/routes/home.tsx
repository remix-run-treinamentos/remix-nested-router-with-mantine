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
} from "@mantine/core";
import type { To } from "history";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

export default function homePage() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const matches = useMediaQuery("(min-width: 900px)", false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
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
                to="venda"
                icon={
                  <ThemeIcon variant="light">
                    <Plus size={16} />
                  </ThemeIcon>
                }
                label="Venda"
              />
              <MenuEntry
                to="produto"
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
      }
      footer={
        <Footer height={60} p="md">
          <Text size={"sm"}>ProgSTOCK 0.01 - BETA</Text>
        </Footer>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Anchor component={Link} to="." variant="gradient">
              <Title order={1}>Dashboard</Title>
            </Anchor>

            <Group hidden={!matches}>
              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size="lg"
                aria-label="switch-theme-mode"
              >
                {colorScheme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <MoonStars size={20} />
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[4],
        },
      })}
    >
      <Outlet />
    </AppShell>
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
