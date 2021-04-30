import React, { useEffect, useState } from 'react';
import { useProject } from '../hooks/useProject';
import { TemplateItem } from './TemplateItem';
import styles from './WizardTemplates.module.scss';
import { SiTypescript, SiJavascript, SiLua } from 'react-icons/si';
import { CFATemplate } from '../../../context/WizardProvider';
import axios from 'axios';

const templatePackages: string[] = ['cfa-template-lua'];

async function fetchTemplateData(pkg: string): Promise<any> {
    try {
        return await axios.get(`https://cdn.skypack.dev/${pkg}/package.json`);
    } catch (error) {
        return;
    }
}

export const WizardTemplates = () => {
    const { resourceTemplate, setResourceTemplate } = useProject();

    const [templates, setTemplates] = useState<CFATemplate[]>();

    useEffect(() => {
        (async (): Promise<CFATemplate[] | undefined> => {
            let TemplateList: CFATemplate[] = [];

            function GetThumbnail(pkg: string, data: any): string {
                if (!!data?.thumbnail && typeof data.thumbnail === 'string') {
                    if (
                        !data.thumbnail.startsWith('https://') &&
                        !data.thumbnail.startsWith('http://')
                    ) {
                        return new URL(
                            data.thumbnail,
                            `https://cdn.jsdelivr.net/npm/${pkg}@${data.version}/`,
                        ).href;
                    } else {
                        return data.thumbnail;
                    }
                } else {
                    return null;
                }
            }

            for (let pkg of templatePackages) {
                const res = await fetchTemplateData(pkg);
                if (
                    res &&
                    !!res?.data?.keywords &&
                    res.data.keywords.includes('cfa-template')
                ) {
                    TemplateList.push({
                        title: res.data?.title ? res.data.title : pkg,
                        description: res.data?.description
                            ? res.data.description
                            : 'No description provided',
                        thumbnail: GetThumbnail(pkg, res.data),
                        package: pkg,
                    });
                }
            }

            return TemplateList;
        })().then((temps: CFATemplate[]) => (temps ? setTemplates(temps) : 0));
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
