import React, { useEffect, useState } from 'react';
import { Button } from '../../../ui';
import { BorderedInput } from '../../../ui/BorderedInput/BorderedInput';
import { useProject } from '../hooks/useProject';
import { TemplateItem } from './TemplateItem';
import styles from './WizardTemplates.module.scss';
import { SiTypescript, SiJavascript, SiLua } from 'react-icons/si';

const templates = [
    {
        type: 'Typescript',
        title: 'Typescript Resource',
        thumbnail: <SiTypescript color="white" size={88} />,
    },
    {
        type: 'Javascript',
        title: 'Javascript Resource',
        thumbnail: <SiJavascript color="white" size={88} />,
    },
    {
        type: 'Lua',
        title: 'Lua Resource',
        thumbnail: <SiLua color="white" size={88} />,
    },
];

export const WizardTemplates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<null | string>(
        null,
    );
    const { project, setProject } = useProject();

    const setTemplate = (temp: string) => {
        setProject({
            ...project,
            templateType: temp,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <label>Project Templates</label>
                {/* <BorderedInput placeholder="Search project templates" /> */}
            </div>

            <div className={styles.templateList}>
                {templates &&
                    templates.map((temp) => (
                        <TemplateItem
                            active={project.templateType === temp.type}
                            thumbnail={temp.thumbnail}
                            title={temp.title}
                            type={temp.type}
                            selectTemplate={(type) => setTemplate(type)}
                        />
                    ))}
            </div>
        </div>
    );
};
