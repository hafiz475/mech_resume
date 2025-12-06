export const hologramShader = {
  uniforms: {
    uTime: { value: 0.0 },
    uColor: { value: new Float32Array([0.0, 0.9, 1.0]) },
    uOpacity: { value: 0.55 },
  },


  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,

  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uOpacity;
    uniform vec3 uColor;

    void main() {
      // horizontal scanlines
      float scan = sin(vUv.y * 120.0 + uTime * 4.0) * 0.08;

      // flicker noise
      float flicker = sin(uTime * 25.0) * 0.03;

      // ring pulse from center
      float dist = distance(vUv, vec2(0.5));
      float ring = smoothstep(0.48, 0.5, abs(dist - (0.3 + sin(uTime * 2.0) * 0.1))) * 0.8;

      // base hologram color
      vec3 finalColor = uColor + scan + ring + flicker;

      gl_FragColor = vec4(finalColor, uOpacity);
    }
  `,
};
