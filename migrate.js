const fs = require('fs');
const files = ['analytics.ejs', 'ads.ejs', 'app_config.ejs', 'edit_server.ejs', 'servers.ejs'];
files.forEach(file => {
  let content = fs.readFileSync('views/' + file, 'utf8');

  // Replace the old nav block
  content = content.replace(/<nav class="bg-\[#424A5C\][\s\S]*?<\/nav>/,
    `<%- include('partials/sidebar', {activePage: '${file.replace('.ejs', '').replace('_', '')}'}) %>\n        <div class="flex-1 flex flex-col ml-64 overflow-hidden">\n            <%- include('partials/topbar', {pageTitle: 'Admin Panel', pageSubtitle: 'Manage your settings'}) %>\n            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8fafc] p-6 lg:p-8">`
  );

  // Update body tag to wrap the container
  content = content.replace('<body class="bg-gray-100">',
    `<body class="bg-[#f3f4f6] text-gray-800 font-sans antialiased">\n    <div class="flex h-screen overflow-hidden">`
  );

  // Close the wrapping tags right before body closes
  content = content.replace('</body>',
    `            </main>\n        </div>\n    </div>\n</body>`
  );

  fs.writeFileSync('views/' + file, content);
});
console.log('Migration complete');