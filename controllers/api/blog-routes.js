//require
const router = require('express').Router();
const { Post, Comment } = require('../../models');
const postCreatorCheck = require('../../utils/postCreatorCheck')
const withAuth = (req, res) = require('../../utils/auth');

//create post
router.post('/api/post', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
        });
        res.status(200).json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create comment
router.post('/api/comment', withAuth, (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update post
router.put('/:id', withAuth, postCreatorCheck, async (req, res) => {
    try {
        const dbPostData = await Post.update(
            {
                title: req.body.title,
                content: req.body.contect
            }, {
                where: {
                    id: req.params.id
                },
            });
            res.status(200).json(dbPostData);
        } catch (err) {
            res.status(500).json(err);
        }
});

//delete post
router.delete('/:id', withAuth, postCreatorCheck, async (req, res) => {
    try {
        const dbPostData = await Post.destroy(
            {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//export
module.exports - router;
