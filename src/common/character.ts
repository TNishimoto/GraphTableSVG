
var characters = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;'
};
export function recoverFromEscapeCharacter(text : string): string{
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&quot;/g, `"`);
    text = text.replace(/&#39;/g, `'`);
    return text;

}
