import styles from './UniversalTitle.module.css'
import { UniversalTitleProps } from './UniversalTitle.props';

const headingTags = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6'
} as const;

function UniversalTitle({
  title,
  level = 1
}: UniversalTitleProps) {
  const Tag = headingTags[level];

  return (
    <Tag className={styles['universal-title']}>
      {title}
    </Tag>
  );
}

export default UniversalTitle;