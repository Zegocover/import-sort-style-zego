const fixedOrder = ["react", "react-relay", "prop-types"];

export default function(styleApi) {
  const {
    alias,
    and,
    not,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isInstalledModule,
    isNodeModule,
    isRelativeModule,
    moduleName,
    unicode,
    naturally
  } = styleApi;

  const isReactEcosystemModule = imported =>
    Boolean(
      imported.moduleName.match(
        /^(react|react-dom|react-native|react-relay|relay-runtime|prop-types|redux)/
      )
    );
  const isArchitectureModule = imported =>
    Boolean(imported.moduleName.match(/^(next|@lingui|@emotion|date-fns)/));
  const isZegoModule = imported =>
    Boolean(imported.moduleName.match(/^(@zego)/));
  const isZegoComponentModule = imported =>
    Boolean(imported.moduleName.match(/^(@zego\/components)/));

  const isStylesModule = imported =>
    Boolean(imported.moduleName.match(/\.(s?css|less)$/));
  const isImageModule = imported =>
    Boolean(imported.moduleName.match(/\.(svg|png|gif|jpg|jpeg|webp)$/));

  const reactComparator = (name1, name2) => {
    let i1 = fixedOrder.indexOf(name1);
    let i2 = fixedOrder.indexOf(name2);

    i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
    i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;

    return i1 === i2 ? naturally(name1, name2) : i1 - i2;
  };

  return [
    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo"
    {
      match: and(
        hasNoMember,
        isRelativeModule,
        not(isStylesModule),
        not(isImageModule)
      )
    },
    { separator: true },

    // import … from "fs";
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import React from "react";
    {
      match: isReactEcosystemModule,
      sort: moduleName(reactComparator),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import { t } from '@lingui/macro';
    {
      match: isArchitectureModule,
      sort: moduleName(reactComparator),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import uniq from 'lodash/uniq';
    {
      match: isInstalledModule(__filename),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import { foo } from "@zego/util.js";
    {
      match: and(
        isZegoModule,
        not(isZegoComponentModule),
        not(isStylesModule),
        not(isImageModule)
      ),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import Component from "@zego/components/Component";
    {
      match: isZegoComponentModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import … from "./foo";
    // import … from "../foo";
    {
      match: and(isRelativeModule, not(isStylesModule), not(isImageModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import "./styles.css";
    { match: and(hasNoMember, isRelativeModule, isStylesModule) },

    // import styles from "./Components.scss";
    {
      match: isStylesModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import foo from "@zego/foo.jpg";
    {
      match: and(isZegoModule, isImageModule),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode)
    },
    { separator: true },
    // import foo from "./foo.jpg";
    {
      match: isImageModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode)
    },
    { separator: true },
    { separator: true }
  ];
}
