<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();
$patient = new Patient($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['client_id'])) {
            // Buscar paciente por ID
            handleLogin();
        } else {
            // Listar todos os pacientes
            handleList();
        }
        break;
        
    case 'POST':
        // Cadastrar novo paciente
        handleRegister();
        break;
        
    default:
        errorResponse('Método não suportado', 405);
        break;
}

function handleLogin() {
    global $patient;
    
    $client_id = $_GET['client_id'];
    
    if (empty($client_id)) {
        errorResponse('ID do cliente é obrigatório');
        return;
    }
    
    $result = $patient->findByClientId($client_id);
    
    if ($result) {
        // Adicionar idade calculada
        $result['age'] = calculateAge($result['birth_date']);
        $result['birth_date_formatted'] = date('d/m/Y', strtotime($result['birth_date']));
        
        successResponse($result, 'Paciente encontrado');
    } else {
        errorResponse('ID do paciente não encontrado', 404);
    }
}

function handleRegister() {
    global $patient;
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        errorResponse('Dados inválidos');
        return;
    }
    
    // Validações
    $errors = [];
    
    if (empty(trim($data['name']))) {
        $errors[] = 'Nome é obrigatório';
    }
    
    if (empty($data['birth_date'])) {
        $errors[] = 'Data de nascimento é obrigatória';
    } else {
        $dateError = validateDate($data['birth_date']);
        if ($dateError) {
            $errors[] = $dateError;
        }
    }
    
    if (empty($data['gender']) || !in_array($data['gender'], ['M', 'F', 'O'])) {
        $errors[] = 'Sexo é obrigatório';
    }
    
    if (empty(trim($data['address']))) {
        $errors[] = 'Endereço é obrigatório';
    }
    
    if (empty(trim($data['contact']))) {
        $errors[] = 'Contato é obrigatório';
    } else {
        $phoneError = validatePhone($data['contact']);
        if ($phoneError) {
            $errors[] = $phoneError;
        }
    }
    
    if (!empty($errors)) {
        errorResponse(implode(', ', $errors));
        return;
    }
    
    // Gerar ID único do cliente
    $client_id = $patient->generateClientId();
    
    // Definir dados do paciente
    $patient->name = trim($data['name']);
    $patient->birth_date = $data['birth_date'];
    $patient->gender = $data['gender'];
    $patient->address = trim($data['address']);
    $patient->contact = formatPhone($data['contact']);
    $patient->client_id = $client_id;
    $patient->created_at = date('Y-m-d H:i:s');
    
    if ($patient->create()) {
        $response = [
            'id' => $client_id,
            'name' => $patient->name,
            'birth_date' => $patient->birth_date,
            'gender' => $patient->gender,
            'address' => $patient->address,
            'contact' => $patient->contact,
            'client_id' => $patient->client_id,
            'clientId' => $patient->client_id, // Compatibilidade com frontend
            'age' => calculateAge($patient->birth_date),
            'birth_date_formatted' => date('d/m/Y', strtotime($patient->birth_date))
        ];
        
        successResponse($response, 'Paciente cadastrado com sucesso');
    } else {
        errorResponse('Erro ao cadastrar paciente', 500);
    }
}

function handleList() {
    global $patient;
    
    $stmt = $patient->read();
    $patients = [];
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['age'] = calculateAge($row['birth_date']);
        $row['birth_date_formatted'] = date('d/m/Y', strtotime($row['birth_date']));
        $row['clientId'] = $row['client_id']; // Compatibilidade com frontend
        $patients[] = $row;
    }
    
    successResponse($patients, 'Lista de pacientes');
}
?>