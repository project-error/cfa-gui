import React from 'react';
import { Checkbox } from '../../../ui/Checkbox/Checkbox';
import styles from './WizardPackages.module.scss';

interface PackageProps {
    packageName: string;
    packageTitle: string;
    isSelected: boolean;
    onClick: (pack: string) => void;
}

export const Package = ({
    packageName,
    isSelected,
    packageTitle,
    onClick,
}: PackageProps) => {
    return (
        <div className={styles.package} onClick={() => onClick(packageName)}>
            <Checkbox size={32} isChecked={isSelected} />
            <h1>{packageTitle}</h1>
        </div>
    );
};
