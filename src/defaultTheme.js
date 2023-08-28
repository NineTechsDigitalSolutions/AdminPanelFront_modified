export const theme = {
  //   light: {
  //     background: "#fff",
  //     lightBackground: "#eee",
  //     text: "#000",
  //     secondaryText: "#6c757d",
  //     section: "#fff",
  //     navLink: "#42474c",
  //     listHover: "#f5f5f5",
  //     divider: "#edf1f4",
  //     inputBorder: "#d9d9d9",
  //   },
  //   dark: {
  //     background: " #121212",
  //     lightBackground: "#18191a",
  //     text: "#e4e6eb",
  //     secondaryText: "#b0b3b8",
  //     section: "#424242",
  //     navLink: "#b0b3b8",
  //     listHover: "rgba(255, 255, 255, 0.08)",
  //     divider: "#575858",
  //     inputBorder: "#575858",
  //   },
  colors: {
    "primary-color": "#482ff7",
    "secondary-color": "#19A057",
    "text-color-secondary": "fade(@black, 45%)",
    "text-color": "#000",
    "box-shadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
    "menu-bg-color": "#e9c46a",
    "body-bg-color": "#fff",
    "sidebar-bg-color": "#2a9d8f",
    "header-color": "#2a9d8f",
    "@layout-trigger-background": "#E76E2D",
    "@layout-header-background": "#8a421b",
  },
};

export const switchTheme = (mode = "light", themeColors = theme.colors) => {
  let themeMode = { ...theme[mode], ...themeColors };
  Object.keys(themeMode).forEach((key) => {
    document.body.style.setProperty(`--${key}`, themeMode[key]);
  });
  const newTheme = { mode: mode, colors: themeColors };
  localStorage.setItem("themeConfig", JSON.stringify(newTheme));
  return newTheme;
};
