/*
 *
 * Displays a snackbar information banner, that is styled. If no message
 * is given, will render null. This allows you to insert the
 * banner without checking if the message exists first.
 *
 * Use variant prop to change the banner to warning or error
 *
 * ## Usage
 * ```
 * <Banner message={message} />
 * ```
 */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles"; // use core for default theme
import color from "color";

// Component Imports
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles(theme => {
  // invert current background colors for emphasis
  let background = color(theme.palette.background.default).negate();

  // Style like the snackbars. Slightly off white or off black
  if (background.luminosity() > 0.5) {
    background = background.lighten(0.2).string();
  } else {
    background = background.darken(0.8).string();
  }

  return {
    root: {
      margin: theme.spacing(2)
    },
    compact: {
      minWidth: "200px"
    },
    /** Error variant styles */
    error: {
      color: theme.palette.text.primary,
      backgroundColor:
        theme.palette.error[theme.palette.type === "dark" ? "light" : "dark"]
    },
    /** Warning variant styles */
    warning: {
      backgroundColor:
        theme.palette.secondary[
          theme.palette.type === "dark" ? "light" : "dark"
        ]
    }
  };
});

InfoBanner.propTypes = {
  /**
   * Message to display in the banner. Banner will not render if set to null.
   */
  message: PropTypes.string,
  /**
   * When set to true, will use compact padding. Used in sidebars to the banner doesnt overflow
   * the sidebar side.
   */
  compact: PropTypes.bool,
  /**
   * Type of banner. Can be
   *  - error
   *  - warning
   *  - info (default)
   */
  variant: PropTypes.string
};

InfoBanner.defaultProps = {
  message: null,
  compact: false,
  variant: "info"
};

export default function InfoBanner({
  message,
  contentGroup,
  compact,
  variant
}) {
  const classes = useStyles();

  if (message === "" || message === null || message === undefined) {
    return null;
  }

  let className = classes.root; // Snackbar Element
  if (compact) {
    className = `${className} ${classes.compact}`;
  }

  switch (variant) {
    case "error": {
      className = `${className} ${classes.error}`;
      break;
    }
    case "warning": {
      className = `${className} ${classes.warning}`;
      break;
    }
    case "info":
    default: {
      break;
    }
  }

  return <SnackbarContent className={className} message={message} />;
}
