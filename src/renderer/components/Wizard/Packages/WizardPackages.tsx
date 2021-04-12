import React, { useState, useEffect } from 'react';
import { Button } from '../../../ui';
import { useProject } from '../hooks/useProject';
import { Package } from './Package';
import styles from './WizardPackages.module.scss';

export const WizardPackages = () => {
    const { project, setProject } = useProject();
    const [selectedPackages, setSelectedPackages] = useState<string[]>(
        project.packages ? project.packages : [],
    );

    const handlePackage = (pack: string) => {
        // Check if they already selected/added the package if so
        // Lets remove it since I would assume they dont want it anymore?
        const tempArr = [...selectedPackages];
        const packIndex = selectedPackages.findIndex((e) => e === pack);

        if (packIndex >= 0) {
            tempArr.splice(packIndex, 1);
        } else {
            tempArr.push(pack);
        }

        setSelectedPackages(tempArr);
    };

    useEffect(() => {
        setProject({
            ...project,
            packages: selectedPackages,
        });
    }, [selectedPackages]);

    return (
        <div className={styles.container}>
            <div className={styles.titleSection}>
                <label>Choose what packages you would like to include</label>
            </div>
            <Button onClick={() => console.log(project)}>SS</Button>

            <div className={styles.packageList}>
                <Package
                    packageName="fivem-js"
                    packageTitle="Fivem-js"
                    onClick={handlePackage}
                    isSelected={selectedPackages.includes('fivem-js')}
                />
                <Package
                    packageName="typeorm"
                    packageTitle="TypeORM"
                    onClick={handlePackage}
                    isSelected={selectedPackages.includes('typeorm')}
                />
                <Package
                    packageName="mysql2"
                    packageTitle="mysql2"
                    onClick={handlePackage}
                    isSelected={selectedPackages.includes('mysql2')}
                />
                <Package
                    packageName="esx.js"
                    packageTitle="esx.js"
                    onClick={handlePackage}
                    isSelected={selectedPackages.includes('esx.js')}
                />
            </div>
        </div>
    );
};
