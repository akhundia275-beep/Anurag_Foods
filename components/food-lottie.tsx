"use client";

import Lottie from "lottie-react";

const steamAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 320,
  h: 260,
  nm: "Momo steam",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Basket",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [160, 180, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [230, 84] },
          nm: "Basket oval"
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.74, 0.47, 0.22, 1] },
          o: { a: 0, k: 100 }
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Momo row",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [160, 130, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { a: 0, k: [-70, 10] }, s: { a: 0, k: [62, 54] }, nm: "Momo 1" },
        { ty: "el", p: { a: 0, k: [0, -4] }, s: { a: 0, k: [72, 64] }, nm: "Momo 2" },
        { ty: "el", p: { a: 0, k: [72, 10] }, s: { a: 0, k: [62, 54] }, nm: "Momo 3" },
        { ty: "fl", c: { a: 0, k: [0.98, 0.9, 0.75, 1] }, o: { a: 0, k: 100 } },
        { ty: "st", c: { a: 0, k: [0.97, 0.5, 0.1, 1] }, o: { a: 0, k: 100 }, w: 5, lc: 2, lj: 2 }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Steam",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [20], e: [80] },
            { t: 45, s: [80], e: [20] },
            { t: 90, s: [20], e: [20] }
          ]
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [160, 88, 0], e: [160, 48, 0] },
            { t: 60, s: [160, 48, 0], e: [160, 88, 0] },
            { t: 120, s: [160, 88, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "sh",
          ks: {
            a: 0,
            k: {
              i: [
                [0, 0],
                [-20, -20],
                [20, -20]
              ],
              o: [
                [20, -20],
                [-20, -20],
                [0, 0]
              ],
              v: [
                [-54, 16],
                [-24, -32],
                [-2, -78]
              ],
              c: false
            }
          },
          nm: "Steam 1"
        },
        {
          ty: "sh",
          ks: {
            a: 0,
            k: {
              i: [
                [0, 0],
                [-18, -18],
                [18, -18]
              ],
              o: [
                [18, -18],
                [-18, -18],
                [0, 0]
              ],
              v: [
                [10, 12],
                [38, -34],
                [58, -82]
              ],
              c: false
            }
          },
          nm: "Steam 2"
        },
        { ty: "st", c: { a: 0, k: [0.18, 0.56, 0.23, 1] }, o: { a: 0, k: 75 }, w: 8, lc: 2, lj: 2 }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    }
  ]
};

export function FoodLottie() {
  return <Lottie animationData={steamAnimation} loop autoplay className="h-full w-full" />;
}
