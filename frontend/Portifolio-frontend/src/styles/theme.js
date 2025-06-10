export const colors = {
  primary: '#003366',     // Deep Blue from gradient
  primaryLight: '#006699', // Mid Blue from gradient
  accent1: '#7EEAEA',     // Light Teal accent color
  accent2: '#00A8A8',     // Darker Teal from gradient
  text: '#FFFFFF',        // White text
  textSecondary: '#E0F7F7', // Light blue-tinted text
  background: '#003366',  // Deep Blue background
  secondary: '#E0F7F7',   // Light blue-tinted secondary
  success: '#7EEAEA',     // Using Teal as Success
  highlight: '#7EEAEA',   // Using Teal as Highlight
  cardBg: 'rgba(0, 51, 102, 0.7)', // Card background with transparency
};

export const themeConfig = {
  token: {
    colorPrimary: colors.accent1,
    colorSuccess: colors.success,
    colorWarning: colors.accent2,
    colorInfo: colors.accent1,
    colorTextBase: colors.textSecondary,
    colorBgBase: colors.background,
    borderRadius: 6,
    fontFamily: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Button: {
      colorPrimary: colors.text,
      colorText: colors.primaryLight,
      algorithm: true,
    },
    Menu: {
      colorItemBgSelected: 'rgba(126, 234, 234, 0.1)',
      colorItemTextSelected: colors.accent1,
      colorItemTextHover: colors.accent1,
      colorItemBgHover: 'rgba(126, 234, 234, 0.05)',
    },
    Typography: {
      colorTextHeading: colors.text,
      colorText: colors.textSecondary,
    },
    Input: {
      colorBgContainer: colors.cardBg,
      colorBorder: 'rgba(126, 234, 234, 0.3)',
      colorPrimaryHover: colors.accent1,
    },
    Card: {
      colorBgContainer: colors.cardBg,
      colorBorderSecondary: 'rgba(126, 234, 234, 0.2)',
      borderRadiusLG: 16,
    },
    Modal: {
      colorBgElevated: colors.cardBg,
      colorText: colors.text,
    },
    Drawer: {
      colorBgElevated: colors.primary,
      colorText: colors.text,
    },
    Form: {
      colorTextHeading: colors.text,
      colorTextLabel: colors.text,
    },
    Divider: {
      colorSplit: 'rgba(126, 234, 234, 0.15)',
    },
    Tag: {
      colorBgContainer: 'rgba(126, 234, 234, 0.05)',
      colorText: colors.textSecondary,
      colorBorder: colors.accent1,
      borderRadiusSM: 40,
    },
  },
};