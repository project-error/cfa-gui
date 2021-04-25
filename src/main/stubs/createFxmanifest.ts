export const createFxmaniest = (json: { [key: string]: string | string[] }) => {
    let indent = Array(4).fill(' ').join('');

    let output = json.fx_version
        ? `fx_version '${json.fx_version}'\n`
        : "fx_version 'cerulean'\n";
    output += "game 'gta5'\n\n";

    // Add grouping vars
    output += json.name ? `name '${json.name}'\n` : '';
    output += json.author ? `author '${json.author}'\n` : '';
    output += json.description ? `description '${json.description}'\n` : '';
    output += json.version ? `version '${json.version}'\n` : '';
    output +=
        json.name || json.author || json.description || json.version
            ? '\n\n'
            : '';

    // Delete grouping properties
    delete json.fx_version;
    delete json.game && delete json.games;
    delete json.name;
    delete json.author;
    delete json.description;
    delete json.version;

    for (let [key, value] of Object.entries(json)) {
        if (Array.isArray(value)) {
            value
                .filter((v) => typeof v === 'string')
                .map((v: string, i: number, array: string[]) => {
                    if (i == 0) output += `${key} {\n`;
                    output += `${indent}'${v}'${
                        i === array.length - 1 ? '' : ','
                    }\n`;
                });
            output += '}\n';
        } else {
            output += `${key} '${value}'\n\n`;
        }
    }
    return output;
};
