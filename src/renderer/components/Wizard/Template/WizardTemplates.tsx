import React, { useEffect, useState } from 'react';
import { useProject } from '../hooks/useProject';
import { TemplateItem } from './TemplateItem';
import styles from './WizardTemplates.module.scss';
import { SiTypescript, SiJavascript, SiLua } from 'react-icons/si';
import { CFATemplate } from '../../../context/WizardProvider';
import axios from 'axios';

async function validateTemplatePackage(pkg: string): Promise<boolean> {
    let response;
    try {
        response = await axios.get(
            `https://cdn.jsdelivr.net/npm/${pkg}@latest/package.json`,
        );
        // Success 🎉
        // console.log(response);
    } catch (error) {
        return false;
    }

    return (
        !!response.data?.keywords &&
        response.data.keywords.includes('cfa-template')
    );
}

function mapAsync<T1, T2>(
    array: T1[],
    callback: (value: T1, index: number, array: T1[]) => Promise<T2>,
): Promise<T2[]> {
    return Promise.all(array.map(callback));
}

async function filterAsync<T>(
    array: T[],
    callback: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
    const filterMap = await mapAsync(array, callback);
    return array.filter((_, index) => filterMap[index]);
}

export const WizardTemplates = () => {
    const { resourceTemplate, setResourceTemplate } = useProject();

    const [templates, setTemplates] = useState<CFATemplate[]>([
        {
            // type: 'TypeScript',
            title: 'Typescript Resource',
            description: 'A complete starter kit with tsconfig and webpack.',
            // thumbnail: <SiTypescript color="white" size={90} />,
            package: 'cfa-template-luaddd', // FIX: Replace in the future
        },
        {
            // type: 'JavaScript',
            title: 'Javascript Resource',
            description: 'A simple boilerplate with webpack.',
            // thumbnail: <SiJavascript color="white" size={90} />,
            package: 'cfa-template-lua', // FIX: Replace in the future
        },
        {
            // type: 'Lua',
            title: 'Lua Resource',
            description: 'Includes a client and server file.',
            // thumbnail: <SiLua color="white" size={90} />,
            package: 'cfa-template-lua',
        },
    ]);

    useEffect(() => {
        (async () => {
            return await filterAsync(
                templates,
                async (template) =>
                    await validateTemplatePackage(template.package),
            );
        })().then((temp) => {
            setTemplates(temp);
        });

        // templates.filter();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <label>Project Templates</label>
                {/* <BorderedInput placeholder="Search project templates" /> */}
            </div>

            <div className={styles.templateList}>
                {templates &&
                    templates.map((template, i) => (
                        <TemplateItem
                            key={i}
                            active={resourceTemplate === template}
                            template={template}
                            onClick={() => setResourceTemplate(template)}
                        />
                    ))}
            </div>
        </div>
    );
};
