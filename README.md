# import-sort-style-react

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules.

```js
// Absolute modules with side effects (not sorted because order may matter)
import "a";
import "c";
import "b";

// Relative modules with side effects (not sorted because order may matter)
import "./a";
import "./c";
import "./b";

// Modules from the React eco-system (react, prop-types, redux modules) library sorted by name
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Modules from the Node.js "standard" library sorted by name
import {readFile, writeFile} from "fs";
import * as path from "path";

// Third-party modules sorted by name
import aa from "aa";
import bb from "bb";
import cc from "cc";

// First-party modules sorted by "relative depth" and then by name
import aaa from "../../aaa";
import bbb from "../../bbb";
import aaaa from "../aaaa";
import bbbb from "../bbbb";
import aaaaa from "./aaaaa";
import bbbbb from "./bbbbb";

// First-party styles modules sorted by "relative depth" and then by name
import styles from "./Component.scss";
```
