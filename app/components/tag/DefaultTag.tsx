import classNames from 'classnames';

type TagColors = 'bg-red-800' | 'bg-green-800' | 'bg-indigo-800' | 'bg-rose-800' | 'bg-fuchsia-800';

function getTextColor(tagColor: TagColors) {
    switch (tagColor) {
        case 'bg-fuchsia-800': {
            return 'text-fuchsia-400';
        }
        case 'bg-red-800': {
            return 'text-red-400';
        }
        case 'bg-green-800': {
            return 'text-green-400';
        }
        case 'bg-indigo-800': {
            return 'text-indigo-400';
        }
        case 'bg-rose-800': {
            return 'text-rose-400';
        }
    }
}

function getRingColor(tagColor: TagColors) {
    switch (tagColor) {
        case 'bg-fuchsia-800': {
            return 'ring-fuchsia-800';
        }
        case 'bg-red-800': {
            return 'ring-red-800';
        }
        case 'bg-green-800': {
            return 'ring-green-800';
        }
        case 'bg-indigo-800': {
            return 'ring-indigo-800';
        }
        case 'bg-rose-800': {
            return 'ring-rose-800';
        }
    }
}

export const DefaultTag = ({ text, color }: { text?: string; color: TagColors }) => {
    const style = classNames(
        'rounded',
        'px-3 py-1',
        `${color}/20`,
        'ring',
        'ring-1',
        getRingColor(color)
    );

    return (
        <div className={style}>
            <p
                className={classNames(
                    'font-inter',
                    'font-light',
                    'text-label-small',
                    getTextColor(color)
                )}>
                {text}
            </p>
        </div>
    );
};
