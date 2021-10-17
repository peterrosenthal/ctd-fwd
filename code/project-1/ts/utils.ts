import * as THREE from 'three';

// adapted from threejsfundamentals:
// https://threejsfundamentals.org/threejs/lessons/threejs-load-gltf.html
export function dumpObject(
  obj: THREE.Object3D,
  lines:string[] = [],
  isLast = true,
  prefix = ''): string[] {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}

export interface GeometryData {
  vertices: number[];
  indices: number[];
}

export function getMeshVertices(mesh: THREE.Mesh): GeometryData {
  const geometry = mesh.geometry;
  const vertices = geometry.getAttribute('position');
  const indices = geometry.index;
  if (vertices !== undefined && vertices !== null
     && indices !== undefined && indices !== null) {
    return {
      vertices: vertices.array as number[],
      indices: indices.array as number[],
    };
  }

  return { vertices: [], indices: [] };
}
