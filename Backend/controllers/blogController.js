import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags } = req.body;
    const image = req.file ? `/uploads/blogs/${req.file.filename}` : '';

    if (!title || !content || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and image are required'
      });
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      image
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags } = req.body;
    const image = req.file ? `/uploads/blogs/${req.file.filename}` : undefined;

    const updateData = { title, content, excerpt, category };
    if (tags) updateData.tags = tags.split(',').map(tag => tag.trim());
    if (image) updateData.image = image;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};