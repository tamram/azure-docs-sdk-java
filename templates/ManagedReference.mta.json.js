// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.
var common = require('./common.js');
var opCommon = require('./op.common.js');
var chromeCommon = require('./chrome.common.js');

exports.transform = function (model) {
  model.layout = model.layout || "Reference";
  model._op_layout = model.layout;
  model.pagetype = "Reference";

  if (!model.title) {
	  if (model.type.toLowerCase() !== "container") {		
		  if (!model.isNamespace && !model.isClass && !model.isEnum && !model.isConstructor &&
			  model.nameWithType && model.nameWithType[0]) {
			  model.title = model.nameWithType[0].value + " " + chromeCommon.toTitleCase(model.type);
		  } else {
			  model.title = model.name[0].value + " " + chromeCommon.toTitleCase(model.type);
		  }

		  if (!model.isNamespace && model.namespace && model.namespace.specName && model.namespace.specName[0]) {
			  var namespace = model.namespace.specName[0].value.match(/uid=\"([^\s]+)\"/);
			  if (namespace[1]) {
				  model.title = model.title + " (" + namespace[1] + ")";
			  }
		  }
	  } else {
		  model.title = model.name[0].value;
	  }
  }

  chromeCommon.makeTitle(model);

  chromeCommon.makeDescription(model, model.summary);

  model.toc_asset_id = model.toc_asset_id || model._tocPath;
  model.toc_rel = model.toc_rel || model._tocRel;

  model.platforms = model.platforms || model.platform;
  model.content_git_url = model.content_git_url || common.getImproveTheDocHref(model, model._gitContribute);
  model.source_url = model.source_url || common.getViewSourceHref(model);
  model["ms.assetid"] = model["ms.assetid"] || opCommon.getAssetId(model);

  var canonicalUrl;
  if (model._op_canonicalUrlPrefix && model._path) {
    canonicalUrl = opCommon.getCanonicalUrl(model._op_canonicalUrlPrefix, model._path, model.layout, model._versionPath);
    canonicalUrl = canonicalUrl.replace('.experimental', '');
  }
  model.canonical_url = canonicalUrl;

  if (typeof templateUtility !== 'undefined' && model.breadcrumb_path && model._path) {
    model.breadcrumb_path = templateUtility.resolveSourceRelativePath(model.breadcrumb_path, model._path);
  }
  model.dev_langs = model.langs;

  opCommon.resolvePdfUrlTemplate(model);
  // Clean up unused predefined properties
  var resetKeys = [
    "attributes",
    "uid",
    "id",
    "parent",
    "children",
    "href",
    "name",
    "fullName",
    "type",
    "source",
    "documentation",
    "assemblies",
    "namespace",
    "summary",
    "remarks",
    "example",
    "syntax",
    "overridden",
    "exceptions",
    "seealso",
    "see",
    "inheritance",
    "level",
    "implements",
    "inheritedMembers",
    "conceptual",
    "platform",
    "newFileRepository",
    "thread_safety",
    "defined_in",
    "supported_platforms",
    "requirements",
    "isEii",
    "isExtensionMethod",
    "nameWithType",
    "extensionMethods",
    "_baseDirectory",
    "_displayLangs",
    "gitContribute",
    "_gitContribute",
    "langs",
    "derivedClasses"
  ];

  model = opCommon.resetKeysAndSystemAttributes(model, resetKeys, true);

  chromeCommon.processMetadata(model, canonicalUrl);

  return {
    content: JSON.stringify(model)
  };
}