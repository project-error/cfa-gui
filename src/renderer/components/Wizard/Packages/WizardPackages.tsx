import React, { useState, useEffect } from 'react';
import { Button } from '../../../ui';
import { useProject } from '../hooks/useProject';
import { Package } from './Package';
import styles from './WizardPackages.module.scss';

export const WizardPackages = () => {
    const {
        setResourcePackages,
        resourcePackages,
        resourceTemplate,
    } = useProject();

    const handlePackage = (selectedPackage: string) => {
        const tempArr = [...resourcePackages];
        const packIndex = tempArr.findIndex((e) => e === selectedPackage);

        if (packIndex >= 0) {
            tempArr.splice(packIndex, 1);
        } else {
            tempArr.push(selectedPackage);
        }

        setResourcePackages(tempArr);
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleSection}>
                <label>Choose what packages you would like to include</label>
            </div>

            {resourceTemplate === 'Lua' ? (
                <div className={styles.skipText}>
                    <h1>
                        You are creating a lua resource no need to select
                        packages!
                    </h1>
                </div>
            ) : (
                <div className={styles.packageList}>
                    <Package
                        packageName="fivem-js"
                        packageTitle="Fivem-js"
                        onClick={handlePackage}
                        isSelected={resourcePackages.includes('fivem-js')}
                    />
                    <Package
                        packageName="typeorm"
                        packageTitle="TypeORM"
                        onClick={handlePackage}
                        isSelected={resourcePackages.includes('typeorm')}
                    />
                    <Package
                        packageName="mysql2"
                        packageTitle="mysql2"
                        onClick={handlePackage}
                        isSelected={resourcePackages.includes('mysql2')}
                    />
                    <Package
                        packageName="esx.js"
                        packageTitle="esx.js"
                        onClick={handlePackage}
                        isSelected={resourcePackages.includes('esx.js')}
                    />
                </div>
            )}
        </div>
    );
};
