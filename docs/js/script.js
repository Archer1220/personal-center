// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 页签切换功能
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            button.classList.add('active');
            
            // 隐藏所有页签内容
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // 显示目标页签内容
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 编辑昵称功能
    const editNicknameBtn = document.getElementById('edit-nickname-btn');
    const modal = document.getElementById('edit-nickname-modal');
    const closeModal = document.querySelector('.modal .close');
    const cancelNicknameBtn = document.getElementById('cancel-nickname-btn');
    const saveNicknameBtn = document.getElementById('save-nickname-btn');
    const nicknameInput = document.getElementById('nickname-input');
    const currentNickname = document.getElementById('current-nickname');

    // 打开编辑昵称弹窗
    editNicknameBtn.addEventListener('click', () => {
        nicknameInput.value = currentNickname.textContent;
        modal.classList.add('show');
    });

    // 关闭弹窗的函数
    function closeModalFunc() {
        modal.classList.remove('show');
    }

    // 关闭弹窗事件
    closeModal.addEventListener('click', closeModalFunc);
    cancelNicknameBtn.addEventListener('click', closeModalFunc);

    // 点击弹窗外部关闭弹窗
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // 保存昵称
    saveNicknameBtn.addEventListener('click', () => {
        const newNickname = nicknameInput.value.trim();
        if (newNickname) {
            currentNickname.textContent = newNickname;
            closeModalFunc();
        } else {
            alert('请输入有效的昵称');
        }
    });

    // 草稿箱继续编辑按钮
    const editDraftButtons = document.querySelectorAll('.edit-draft-btn');
    editDraftButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postItem = this.closest('.post-item');
            const title = postItem.querySelector('h3').textContent;
            alert(`继续编辑草稿：${title}`);
        });
    });

    // 我的发帖操作按钮
    const myPostsContainer = document.getElementById('myposts');
    
    // 重新编辑按钮
    myPostsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
            const postItem = e.target.closest('.post-item');
            const title = postItem.querySelector('h3').textContent;
            alert(`重新编辑帖子：${title}`);
        }
    });
    
    // 撤回提交按钮
    myPostsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('withdraw-btn')) {
            const postItem = e.target.closest('.post-item');
            const title = postItem.querySelector('h3').textContent;
            if (confirm(`确定要撤回帖子"${title}"的提交吗？`)) {
                postItem.remove();
                alert('帖子已撤回');
            }
        }
    });
    
    // 删除按钮
    myPostsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const postItem = e.target.closest('.post-item');
            const title = postItem.querySelector('h3').textContent;
            if (confirm(`确定要删除帖子"${title}"吗？`)) {
                postItem.remove();
                alert('帖子已删除');
            }
        }
    });

    // 我的审批操作按钮
    const approvalContainer = document.getElementById('approval');
    
    // 通过按钮
    approvalContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('approve-btn')) {
            const postItem = e.target.closest('.post-item');
            const title = postItem.querySelector('h3').textContent;
            if (confirm(`确定要通过帖子"${title}"的审批吗？`)) {
                postItem.remove();
                alert('审批已通过');
            }
        }
    });
    
    // 退回按钮
    approvalContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('reject-btn')) {
            const postItem = e.target.closest('.post-item');
            const title = postItem.querySelector('h3').textContent;
            if (confirm(`确定要退回帖子"${title}"的审批吗？`)) {
                postItem.remove();
                alert('审批已退回');
            }
        }
    });

    // 命题进展中的帖子详情跳转
    const progressSections = document.querySelectorAll('#progress .post-item');
    progressSections.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            alert(`查看帖子详情：${title}`);
        });
    });

    // 添加页签功能
    const addTabBtn = document.getElementById('add-tab-btn');
    addTabBtn.addEventListener('click', function() {
        const tabName = prompt('请输入新页签的名称:');
        if (tabName) {
            // 生成唯一的ID
            const tabId = 'custom-' + Date.now();
            
            // 创建新的页签包装器
            const tabWrapper = document.createElement('div');
            tabWrapper.className = 'tab-wrapper';
            
            // 创建新的页签按钮
            const newTabButton = document.createElement('button');
            newTabButton.className = 'tab-button';
            newTabButton.setAttribute('data-tab', tabId);
            newTabButton.textContent = tabName;
            
            // 创建删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-tab-button';
            deleteButton.innerHTML = '&times;';
            deleteButton.title = '删除页签';
            
            // 为删除按钮添加点击事件
            deleteButton.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡，避免触发页签切换
                
                if (confirm(`确定要删除页签"${tabName}"吗？`)) {
                    // 删除页签按钮和内容区域
                    tabWrapper.remove();
                    document.getElementById(tabId).remove();
                    
                    // 如果删除的是当前激活的页签，激活第一个页签
                    if (newTabButton.classList.contains('active')) {
                        const firstTabButton = document.querySelector('.tab-button');
                        if (firstTabButton) {
                            firstTabButton.click();
                        }
                    }
                }
            });
            
            // 将按钮添加到包装器中
            tabWrapper.appendChild(newTabButton);
            tabWrapper.appendChild(deleteButton);
            
            // 插入到"+"按钮之前
            this.parentNode.insertBefore(tabWrapper, this.parentNode.lastElementChild);
            
            // 创建新的页签内容区域
            const newTabPane = document.createElement('div');
            newTabPane.id = tabId;
            newTabPane.className = 'tab-pane';
            newTabPane.innerHTML = `
                <div class="post-list">
                    <div class="post-item">
                        <h3>欢迎使用新页签</h3>
                        <p>这是您的新页签"${tabName}"的内容区域。</p>
                        <div class="post-meta">
                            <span class="date">${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加到页签内容容器中
            document.querySelector('.tab-content').appendChild(newTabPane);
            
            // 为新页签按钮添加点击事件
            newTabButton.addEventListener('click', () => {
                // 移除所有按钮的active类
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                // 为当前按钮添加active类
                newTabButton.classList.add('active');
                
                // 隐藏所有页签内容
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                // 显示目标页签内容
                document.getElementById(tabId).classList.add('active');
            });
        }
    });

    // 头像点击显示大图功能
    const avatarImg = document.querySelector('.avatar img');
    const avatarModal = document.getElementById('avatar-modal');
    const avatarLarge = document.getElementById('avatar-large');
    const avatarClose = avatarModal.querySelector('.close');

    // 点击头像显示大图
    avatarImg.addEventListener('click', function() {
        avatarModal.classList.add('show');
        // 更新大图的src为当前头像的src
        avatarLarge.src = this.src;
    });

    // 关闭大图模态框
    avatarClose.addEventListener('click', function() {
        avatarModal.classList.remove('show');
    });

    // 点击模态框外部关闭
    avatarModal.addEventListener('click', function(event) {
        if (event.target === avatarModal) {
            avatarModal.classList.remove('show');
        }
    });
});
