import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';

export function Progress(props) {
    return (
        <div className={classnames("loader", props.globalProgress && "global-loader")}><CircularProgress style={{color : green[500]}}/></div>
    )
}

Progress.propTypes = {
  globalProgress : PropTypes.bool
};

Progress.defaultProps = {
    globalProgress : true
};