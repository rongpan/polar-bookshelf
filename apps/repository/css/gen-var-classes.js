const colors = ['primary', 'secondary', "success", "info", "warning", "danger", "light"];

for (const color of colors) {
    console.log(
`.btn-${color} {
    background-color: var(--${color}) !important;;
    border-color: var(--${color}) !important;;
}

.bg-${color} {
    background-color: var(--${color}) !important;
}

.text-${color} {
    color: var(--${color}) !important;
}

`
    )
}
