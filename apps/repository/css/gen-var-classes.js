const colors = ['primary', 'secondary', "success", "info", "warning", "danger", "light"];

for (const color of colors) {
    console.log(
`.btn-${color} {
    background-color: var(--${color});
    border-color: var(--${color});
}

.bg-${color} {
    background-color: var(--${color});
}

.text-${color} {
    color: var(--${color});
}

`
    )
}
