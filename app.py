from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Lista para almacenar las personas
personas = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        cantidad = int(request.form['cantidad'])
        return redirect(url_for('registro', cantidad=cantidad))
    return render_template('index.html')

@app.route('/registro/<int:cantidad>', methods=['GET', 'POST'])
def registro(cantidad):
    if request.method == 'POST':
        nombre = request.form['nombre']
        edad = int(request.form['edad'])
        nota = float(request.form['nota'])
        
        # Guardar los datos de la persona en la lista
        personas.append([nombre, edad, nota])

        # Si ya se han registrado todas las personas, redirigir a la página de resultados
        if len(personas) == cantidad:
            return redirect(url_for('resultados'))

        return render_template('registro.html', cantidad=cantidad, persona_actual=len(personas)+1)
    
    return render_template('registro.html', cantidad=cantidad, persona_actual=len(personas)+1)

@app.route('/resultados')
def resultados():
    # Ordenar las personas por nota de mayor a menor
    personas_ordenadas = sorted(personas, key=lambda x: x[2], reverse=True)
    return render_template('result.html', personas=personas, personas_ordenadas=personas_ordenadas)

if __name__ == '__main__':
    app.run(debug=True)
