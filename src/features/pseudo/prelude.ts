/**
 * Ayudas de Python que van DESPUÉS del programa traducido: así la línea N del pseudocódigo
 * es la línea N de programa.py y los errores de Python apuntan a la línea correcta.
 */
export const PRELUDE = `
import random as _r
from math import sqrt


def _read():
    s = input()
    for t in (int, float):
        try:
            return t(s)
        except ValueError:
            pass
    return s


def _rng(a, b, s=1):
    return range(a, b + 1, s) if s > 0 else range(a, b - 1, s)


def _array(*d):
    return [0] * d[0] if len(d) == 1 else [_array(*d[1:]) for _ in range(d[0])]


def _random(a, b):
    return _r.randint(a, b)


class _Stack:
    def __init__(self):
        self.d = []

    def push(self, x):
        self.d.append(x)

    def pop(self):
        return self.d.pop()

    def top(self):
        return self.d[-1]

    def empty(self):
        return not self.d

    def size(self):
        return len(self.d)

    def __len__(self):
        return len(self.d)

    def __repr__(self):
        return str(self.d)

    peek = top
    isempty = empty
`;
