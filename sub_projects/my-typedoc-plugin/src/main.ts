import fs = require('fs');
import * as libxmljs from "libxmljs";

import { Application, ParameterType, PageEvent, RendererEvent } from 'typedoc';
import { join, basename } from 'path';
import { copyFileSync } from 'fs';
import { getModuleFiles, getModuleResolver } from './lib';

export const sutoringSrc = "../../scripts/graph_table_svg.js";


export function processHeadTag(doc: libxmljs.Document){
    const head = doc.get("//head");
    if(head != null){
        //const scriptTags = head.find("script");
        //scriptTags.forEach((v) => v.remove());
        const scriptSutoring: libxmljs.Element = new libxmljs.Element(doc, "script", "");
        scriptSutoring.attr({src : sutoringSrc})
        head.addChild(scriptSutoring);    
        /*
        const stopScriptStr = `window.onload = (event) => {
            window.addEventListener("keydown", function(event) {
                event.stopPropagation();
            }, true);
            window.addEventListener("keypress", function(event) {
                event.stopPropagation();
            }, true);
        };`

        const stopScript: libxmljs.Element = new libxmljs.Element(doc, "script", stopScriptStr );
        head.addChild(stopScript);
        */
    }
    
}

const TYPEDOC_VERSION = Application.VERSION;

const pluginOptions = (app: Application) => ({
    options: () => ({
        outDir: app.options.getValue('out') as string | undefined,
        hideGenerator: app.options.getValue('hideGenerator') as boolean,
        favicon: app.options.getValue('favicon') as string | undefined,
        footerDate: app.options.getValue('footerDate') as boolean,
        footerTime: app.options.getValue('footerTime') as boolean,
        footerTypedocVersion: app.options.getValue('footerTypedocVersion') as boolean,
        customTitle: app.options.getValue('customTitle') as string | undefined,
        customTitleLink: app.options.getValue('customTitleLink') as string | undefined,
        customDescription: app.options.getValue('customDescription') as string | undefined
    }),
});

export function appendTest(html: string, url: string): string {
    const xmlDoc = libxmljs.parseHtmlString(html);
    processHeadTag(xmlDoc);

    console.log(url);
    console.log(html.length);
    return xmlDoc.toString();
}


type PluginOptions = ReturnType<typeof pluginOptions>;

export function load(app: Application) {
    
    app.options.addDeclaration({
        name: 'favicon',
        help: 'Extras Plugin: Specify the name of the favicon file.',
        type: ParameterType.String,
        defaultValue: undefined
    });

    app.options.addDeclaration({
        name: 'footerTypedocVersion',
        help: 'Extras Plugin: Appends the TypeDoc version in the footer.',
        type: ParameterType.Boolean,
        defaultValue: false
    });

    app.options.addDeclaration({
        name: 'footerDate',
        help: 'Extras Plugin: Appends the date of generation in the footer.',
        type: ParameterType.Boolean,
        defaultValue: false
    });

    app.options.addDeclaration({
        name: 'footerTime',
        help: 'Extras Plugin: Appends the time of generation in the footer.',
        type: ParameterType.Boolean,
        defaultValue: false
    });

    app.options.addDeclaration({
        name: 'customTitle',
        help: 'Extras Plugin: Specify a custom title, for the top-most title only.',
        type: ParameterType.String,
        defaultValue: undefined
    });

    app.options.addDeclaration({
        name: 'customTitleLink',
        help: 'Extras Plugin: Specify a custom link for the top-most title.',
        type: ParameterType.String,
        defaultValue: undefined
    });

    app.options.addDeclaration({
        name: 'customDescription',
        help: 'Extras Plugin: Specify a custom description for the website.',
        type: ParameterType.String,
        defaultValue: undefined
    });

    const options = pluginOptions(app);
    

    app.renderer.on(PageEvent.END, onPageRendered.bind(options));
    app.renderer.once(RendererEvent.END, onRenderFinished.bind(options));
}

function onPageRendered(this: PluginOptions, page: PageEvent) {
    if (!page.contents)
        return;

    
    const options = this.options();
    const xmlDoc = libxmljs.parseHtmlString(page.contents);
    const mod = getModuleResolver(xmlDoc);
    //console.log(page.filename);

    if(mod != null){
        console.log(mod);

        const templateNodes = xmlDoc.find("//template");
        templateNodes.forEach((v) =>{
            console.log(v.toString());

            const parent = v.parent();
            const button = new libxmljs.Element(xmlDoc , "button", "button");
            button.attr({onclick:`alert("hello")`})
            if(parent instanceof libxmljs.Element){
                parent.addChild(button);
            }
        })

        //console.log(xmlDoc.toString());
        page.contents = xmlDoc.toString();
    }


    //page.contents = appendTest(page.contents, page.filename);

    /*
    // Add icon.
    if (options.favicon) {
        const favicon = isUrl(options.favicon)
            ? options.favicon
            : makeRelativeToRoot(page.url, basename(options.favicon));

        page.contents = appendFavicon(page.contents, favicon);
    }

    // Add TypeDoc version.
    if (options.footerTypedocVersion) {
        page.contents = appendToFooter(page.contents, ` v${TYPEDOC_VERSION}`);
    }

    page.contents = setupNewlineInFooter(page.contents);

    // Add generation date and/or time.
    if (!options.hideGenerator && (options.footerDate || options.footerTime)) {
        const now = new Date();

        let args = [];
        if (options.footerDate) args.push("dateStyle: 'medium'");
        if (options.footerTime) args.push("timeStyle: 'long'");

        const dateFormatter = `new Intl.DateTimeFormat(navigator.language, {${args.join(',')}})`

        // Compute the generation date string on client-side.
        const time = `<br><span id="generation-date"></span><script>window.GENERATION_DATE=${now.getTime()};document.getElementById('generation-date').innerText=${dateFormatter}.format(window.GENERATION_DATE)</script>`;

        page.contents = appendToFooter(page.contents, time);
    }

    // Set custom title.
    if (options.customTitle) {
        page.contents = replaceTopMostTitle(page.contents, options.customTitle);
    }

    // Set custom title link.
    if (options.customTitleLink) {
        page.contents = replaceTopMostTitleLink(page.contents, options.customTitleLink);
    }

    // Set custom description
    if (options.customDescription) {
        page.contents = replaceDescription(page.contents, options.customDescription);
    }
    */
    
}

function onRenderFinished(this: PluginOptions) {
    const options = this.options()


    /*
    // Copy favicon to output directory.
    if (options.favicon && !isUrl(options.favicon)) {
        const workingDir = process.cwd();
        const outDir = options.outDir || './docs';

        const inputFavicon = (options.favicon.indexOf(workingDir) === -1) ?
            join(workingDir, options.favicon) : options.favicon;

        const outputFavicon = (outDir.indexOf(workingDir) === -1) ?
            join(workingDir, outDir, basename(options.favicon)) : join(outDir, basename(options.favicon));

        copyFileSync(inputFavicon, outputFavicon);
    }
    */
}