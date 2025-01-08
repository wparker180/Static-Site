const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

async function build() {
    // Clear dist directory
    await fs.emptyDir('dist');

    // Copy public files
    await fs.copy('public', 'dist');

    // Read base template
    const template = await fs.readFile('src/layouts/base.html', 'utf-8');

    // Build pages
    await buildPages(template);
    
    // Build blog posts
    await buildBlogPosts(template);

    console.log('Site built successfully!');
}

async function buildPages(template) {
    const pagesDir = 'src/content/pages';
    const files = await fs.readdir(pagesDir).catch(() => []);
    
    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(path.join(pagesDir, file), 'utf-8');
            const html = marked(content);
            const title = file.replace('.md', '').split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            const finalHtml = template
                .replace('{{title}}', title)
                .replace('{{content}}', html);
            
            const outputPath = path.join('dist', file.replace('.md', '.html'));
            await fs.outputFile(outputPath, finalHtml);
        }
    }
}

async function buildBlogPosts(template) {
    const blogDir = 'src/content/blog';
    const files = await fs.readdir(blogDir).catch(() => []);
    
    // Create blog index
    let blogIndex = '# Blog Posts\n\n';
    
    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(path.join(blogDir, file), 'utf-8');
            const html = marked(content);
            const title = file.replace('.md', '').split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            // Add to blog index
            blogIndex += `- [${title}](/blog/${file.replace('.md', '.html')})\n`;
            
            const finalHtml = template
                .replace('{{title}}', title)
                .replace('{{content}}', html);
            
            const outputPath = path.join('dist', 'blog', file.replace('.md', '.html'));
            await fs.outputFile(outputPath, finalHtml);
        }
    }
    
    // Create blog index page
    const blogIndexHtml = template
        .replace('{{title}}', 'Blog')
        .replace('{{content}}', marked(blogIndex));
    
    await fs.outputFile('dist/blog/index.html', blogIndexHtml);
}

build().catch(console.error); 