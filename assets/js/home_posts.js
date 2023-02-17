{
    console.log('hello');
    // methor to submit form data for new post through AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'./posts/create',
                data:newPostForm.serialize(),
                success :function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                },
                error : function(err){
                    console.lof(err.responseText);
                }
            });
        })
    }

    createPost();


    // method to create a post in DOM 

    let newPostDom = function(post){
        return $(`<li id="post-${post.id}">
        <p>
                <small>
                    <a class="delete=post=button" href="posts/destroy/${post.id}">X</a>
                </small>   
        <div id="post-list-container">
            <ul>
                <li>
                    ${post.user.name}
                    ${post.content}
                </li>
            </ul>
        </div>
        </p> 
        
        <div class="post-comments">
                <!-- //adding a check so that only people logged in will be able to see the comments form -->
            
                <form action="/comments/create" method="post">
                    <input type="text" name ="content" placeholder="Comment">
                    <input type="hidden" name="post" value="${post._id}" > 
                    <input type="submit" value="Post">
                </form>
            
        </div>
        <!-- div to display comments for post -->
        <div class="post-comments-list"></div>
            <ul id=" post-comments-${post._id}">
                
            </ul>
    </li>`)
    }
    
}