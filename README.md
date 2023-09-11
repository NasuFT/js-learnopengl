# JS-LearnOpenGL

(WORK IN PROGRESS)

An implementation of [LearnOpenGL](https://learnopengl.com) codes and lessons to WebGL 2.

LearnOpenGL is based on OpenGL 3.3 (Core-profile), while WebGL 2 is based on OpenGL ES 3.0.

## Changes from LearnOpenGL

<details>
<summary>Wireframing</summary>

`glPolygonMode()` is not available in WebGL 2 (or in OpenGL ES 3.0). As a workaround, `GL_LINES` needs to be used, thereby increasing the number of calls made to `glDrawArrays()` or equivalent compared to `glPolygonMode()`. Furthermore, indices/vertices need to be specified in order, practically limiting this workaround to very simple primitives. Larger datasets would need to be preprocessed beforehand.
</details>

# Further Information

<details>

<summary>(DEPRECATED) Upgraded to WebGL 2</summary>

As LearnOpenGL is based on OpenGL 3.3 (Core-profile), some of the functions/concepts needed are not found on WebGL 1 which is based on OpenGL ES 2.0.

One of these concepts that is encountered early on are the use of `Vertex Attribute Objects (VAO)` which is not present in base WebGL 1. It is present as an extension in WebGL 1, and as a core functionality in WebGL 2 (based on OpenGL ES 3.0).

</details>

This project was created with [Vite](https://vitejs.dev).
