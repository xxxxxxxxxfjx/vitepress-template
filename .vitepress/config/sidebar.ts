import * as fs from 'fs';
import * as path from 'path';

const docsPath = path.resolve(process.cwd(), 'docs');
// console.log(docsPath);

// const files = fs.readdirSync(docsPath);
// console.log(files);

// for (const file of files) {
//     const p = path.join(docsPath, file);
//     const stat = fs.statSync(p);
//     if (stat.isDirectory()) {
//         console.log(file, p);
//     }
// }

interface SidebarItem {
    text: string;
    link: string;
    collapsible?: boolean;
    items?: SidebarItem[];
}

function fun(root: string) {
    debugger;
    function toList(p: string, prefix = '/docs') {
        const arr = [] as SidebarItem[];
        const files = fs.readdirSync(p);
        for (const file of files) {
            const tmp = { text: file, link: prefix + '/' + file } as SidebarItem;
            const p1 = path.join(p, file);
            const stat = fs.statSync(p1);
            if (stat.isDirectory()) {
                tmp.collapsible = true;
                tmp.items = toList(p1, prefix + '/' + file);
            } else {
                if (tmp.text.endsWith('.md')) {
                    tmp.text = tmp.text.replace('.md', '');
                }
                tmp.link = tmp.link.replace('.md', '');
            }
            arr.push(tmp);
        }
        return arr;
    }
    const list = toList(root);
    return list;
}

console.log(fun(docsPath));

export const sidebar = {
    // '/docs/': [
    //     {
    //         text: '快速上手',
    //         collapsible: false,
    //         link: '/docs/hello',
    //         items: [
    //             { text: 'hello', link: '/docs/hello' },
    //             { text: '欢迎使用', link: '/docs/welcome' },
    //         ],
    //     },
    // ],
    '/docs/': fun(docsPath),
};
