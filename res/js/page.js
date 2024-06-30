/**
 * 展示独立页面的内容
 */
function showPageHtml() {

    const githubUserName = `XiaoFeng-QWQ`;
    const configArray = {
        // GitHub 用户名用于 API 请求
        githubUserName: `XiaoFeng-QWQ`,
        // 当前页面的完整 URL
        currentUrl: window.location.href,
        // 各页面的 URL 路径
        pageUrl: {
            1: '/',                     // 首页路径
            2: '/pages/blog.html',      // 博客页面路径
            3: '/pages/projects.html',  // 项目页面路径
        },
        // 各页面的元素选择器
        pageElement: {
            1: '#page-1 #readme',  // 首页 readme 元素选择器
            2: '#page-2 #blog',    // 博客页面 blog 元素选择器
            3: '#page-3',          // 项目页面元素选择器
        },
        // GitHub 用户信息 API 请求 URL
        githubApiUrl: `https://api.github.com/users/${githubUserName}`,
        // GitHub 用户 README 文件的原始 URL
        githubReadmeUrl: `https://raw.githubusercontent.com/${githubUserName}/${githubUserName}/main/README.md`,
        // 本地 README 文件路径
        readmeUrl: `/README.md`,
    };
    console.table(configArray);

    if (configArray.currentUrl.endsWith(configArray.pageUrl[1])) {
        // 创建一个异步函数
        const fetchData = async () => {
            try {
                const response = await fetch(configArray.githubApiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data: ' + response.status);
                }
                const data = await response.json();
                const readmeResponse = await fetch(configArray.readmeUrl);
                if (!readmeResponse.ok) {
                    throw new Error('Failed to fetch README file: ' + readmeResponse.status);
                }
                const readmeText = await readmeResponse.text();

                const html = `
                <img class="mdui-img-circle" style="max-height: 12rem;" src="https://q.qlogo.cn/headimg_dl?dst_uin=1432777209&spec=640&img_type=jpg" />
                <article class="animate__animated animate__fadeInLeft">${marked.parse(readmeText)}</article>
                `;
                $(configArray.pageElement[1]).html(html);
            } catch (error) {
                console.error('Fetch data error:', error);
                const html = `
                <img class="mdui-img-circle" style="max-height: 12rem;" src="https://q.qlogo.cn/headimg_dl?dst_uin=1432777209&spec=640&img_type=jpg">
                <article class="animate__animated animate__fadeInLeft">
                    <h2>Hi there 👋</h2>
                    <p>Failed to load data. Please check your network connection.</p>
                </article>
                `;
                $(configArray.pageElement[1]).html(html);
            }
        };

        // 调用异步函数
        fetchData();
    }
    if (configArray.currentUrl.endsWith(configArray.pageUrl[2])) {
        $.ajax({
            url: 'https://xiaofeng.now.cc/api/posts',
            dataType: 'JSON',
            success: function (data) {
                $(configArray.pageElement[2]).html('');
                // 提取数据集
                let dataSet = data.data.dataSet;

                // 逐个生成 HTML 并添加到页面中
                $.each(dataSet, function (index, item) {
                    var postHtml = `
                    <div class="mdui-col-sm-12 mdui-col-md-6 item">
                        <div class="mdui-card box-shadow">
                            <div class="mdui-card-primary">
                                <h2 class="mdui-card-primary-title">${item.title}</h2>
                                <p class="digest mdui-card-primary-subtitle">${item.digest}</p>
                            </div>
                            <div class="mdui-card-actions">
                                <button class="mdui-btn mdui-float-right mdui-ripple mdui-btn-raised" onclick="window.open('${item.url}', '_blank')">阅读完整内容</button>
                            </div>
                            <div class="mdui-card-content">
                                <p>发布日期：${item.date.year}-${item.date.month}-${item.date.day}</p>
                            </div>
                        </div>
                    </div>
                    `;
                    // 将生成的 HTML 添加到页面
                    var postHtml = $(postHtml);
                    $(configArray.pageElement[2]).append(postHtml);
                    // 使用 jQuery 的延迟和添加类方法实现逐个添加动画效果
                    postHtml.hide().delay(index * 100).fadeIn(400).addClass('animate__animated animate__fadeInUp');
                });

                // 查看更多文章按钮，直接放在最外层的 HTML 结构外面
                const moreHtml = `
                    <button class="mdui-btn mdui-center mdui-ripple mdui-btn-raised" onclick="window.open('https://xiaofeng.now.cc/', '_blank')">查看更多文章</button>
                `;
                $(configArray.pageElement[2]).append(moreHtml);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(configArray.pageElement[2]).append(`获取文章列表失败:, ${textStatus}, ${errorThrown}`)
            }
        });
    }
    if (configArray.currentUrl.endsWith(configArray.pageUrl[3])) {
        //留空
    }
}
showPageHtml();