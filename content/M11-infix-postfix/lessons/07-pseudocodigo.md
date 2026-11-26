# Infix a postfix en pseudocódigo

Este es el pseudocódigo de tu laboratorio "Infix a postfix", corregido para que corra. Primero una función que da la **jerarquía** de cada signo:

```pseudo
// entrada: a+b*c
Function jer(signo)
    if signo = "^"
        return 3
    else if signo = "*" or signo = "/"
        return 2
    else if signo = "+" or signo = "-"
        return 1
    end if
    return 0
End function

Function convertir(expresion)
    signos ← new Stack()
    postfix ← ""
    for i ← 0 to len(expresion) - 1
        c ← expresion[i]
        if c in "+-*/^"
            while not signos.empty() and jer(signos.top()) >= jer(c)
                postfix ← postfix + signos.pop()
            end while
            signos.push(c)
        else if c = "("
            signos.push(c)
        else if c = ")"
            while signos.top() != "("
                postfix ← postfix + signos.pop()
            end while
            signos.pop()
        else
            postfix ← postfix + c
        end if
    end for
    while not signos.empty()
        postfix ← postfix + signos.pop()
    end while
    return postfix
End function

Begin
    read infix
    write convertir(infix)
End
```

Prueba con `a+b*c` (da `abc*+`) y con `(a+b)*c` (da `ab+c*`).

## Qué se corrigió de la entrega original

- `For i ← 0 to len(expresion)-1` ya estaba bien: el `for` incluye el final.
- `Postfix ← temp` borraba lo anterior: hay que **pegar**, `postfix ← postfix + temp`.
- El `while` de `)` no tenía su `end while` y faltaba sacar el `(` del stack.
- `expresion ← expresion + stack.pop()` escribía en la variable equivocada.
- `If caracter in {"ab…z", "0..9"}` no se puede escribir así: es más simple tratar como operando todo lo que no sea signo ni paréntesis (el último `else`).

## Evaluar postfix

Para evaluar, los números van al stack y cada signo usa los dos de arriba. Ojo con el orden: el primero que sale es el de la **derecha**.

```pseudo
// entrada: 23*4+
Begin
    read expresion
    p ← new Stack()
    for i ← 0 to len(expresion) - 1
        c ← expresion[i]
        if c in "+-*"
            der ← p.pop()
            izq ← p.pop()
            if c = "+"
                p.push(izq + der)
            else if c = "-"
                p.push(izq - der)
            else
                p.push(izq * der)
            end if
        else
            p.push(int(c))
        end if
    end for
    write p.pop()
End
```

Prueba con `23*4+` (da 10). `int(c)` convierte el carácter en número.
